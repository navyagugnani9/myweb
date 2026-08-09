import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { isAuthenticated } from "@/lib/team-auth.server";

const BodySchema = z.object({
  query: z.string().trim().min(3).max(300),
});

interface TavilyResult {
  title: string;
  url: string;
  content: string;
}

interface PersonMatch {
  index: number;
  note: string;
}

export const Route = createFileRoute("/api/team/candidate-search")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await isAuthenticated(request))) {
          return Response.json({ error: "Not authenticated" }, { status: 401 });
        }

        let parsed;
        try {
          parsed = BodySchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        const tavilyKey = process.env.TAVILY_API_KEY;
        const anthropicKey = process.env.ANTHROPIC_API_KEY;
        if (!tavilyKey || !anthropicKey) {
          return Response.json(
            { error: "Search is not configured yet. TAVILY_API_KEY and ANTHROPIC_API_KEY must be set." },
            { status: 500 },
          );
        }

        let results: TavilyResult[];
        try {
          const tavilyRes = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: tavilyKey,
              query: parsed.query,
              search_depth: "basic",
              max_results: 10,
            }),
          });
          if (!tavilyRes.ok) {
            const errText = await tavilyRes.text();
            console.error("Tavily error:", errText);
            return Response.json({ error: "Web search failed" }, { status: 502 });
          }
          const tavilyData = await tavilyRes.json();
          results = (tavilyData.results ?? []).map((r: TavilyResult) => ({
            title: r.title,
            url: r.url,
            content: r.content,
          }));
        } catch (err) {
          console.error("Tavily request failed:", err);
          return Response.json({ error: "Web search failed" }, { status: 502 });
        }

        if (results.length === 0) {
          return Response.json({ people: [] });
        }

        const resultsList = results
          .map((r, i) => `${i + 1}. ${r.title}\n${r.url}\n${r.content}`)
          .join("\n\n");

        let matches: PersonMatch[] = [];
        try {
          const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": anthropicKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-haiku-4-5-20251001",
              max_tokens: 1000,
              system:
                "You help an education-sector recruiter review public web search results for candidate sourcing. Given numbered search results, identify ONLY the ones that describe a specific, named, real individual person who could be a relevant candidate. Exclude: job listings/postings, company or organisation pages, event/fair announcements, generic articles, blog posts about a topic, and anything that does not name a specific person. Respond with ONLY a JSON array (no prose, no markdown, no code fences) of objects with keys: index (the result number) and note (a one-sentence explanation of who this person is and why they're relevant, using only facts present in the snippet). If no results are genuine individual people, respond with exactly: []",
              messages: [
                {
                  role: "user",
                  content: `Search query: "${parsed.query}"\n\nResults:\n\n${resultsList}`,
                },
              ],
            }),
          });
          if (!claudeRes.ok) {
            const errText = await claudeRes.text();
            console.error("Anthropic error:", errText);
            return Response.json({ error: "AI summary failed" }, { status: 502 });
          }
          const claudeData = await claudeRes.json();
          const rawText: string = claudeData.content?.[0]?.text ?? "[]";
          const cleaned = rawText.trim().replace(/^```(json)?/i, "").replace(/```$/, "").trim();
          try {
            matches = JSON.parse(cleaned);
          } catch (parseErr) {
            console.error("Failed to parse Claude JSON:", parseErr, rawText);
            matches = [];
          }
        } catch (err) {
          console.error("Anthropic request failed:", err);
          return Response.json({ error: "AI summary failed" }, { status: 502 });
        }

        const people = matches
          .map((m) => {
            const r = results[m.index - 1];
            if (!r) return null;
            return { title: r.title, url: r.url, content: r.content, note: m.note };
          })
          .filter((p): p is NonNullable<typeof p> => p !== null);

        return Response.json({ people });
      },
    },
  },
});
