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
              max_results: 8,
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
          return Response.json({ summary: "No public results found for this search.", results: [] });
        }

        const resultsList = results
          .map((r, i) => `${i + 1}. ${r.title}\n${r.url}\n${r.content}`)
          .join("\n\n");

        let summary = "";
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
                "You help an education-sector recruiter review public web search results for candidate sourcing. Given numbered search results, identify which ones look like an individual person who could be a relevant candidate (vs. job ads, company pages, or unrelated content), and briefly summarize who they are and why they might be relevant, citing the result number. Skip clearly irrelevant results. Be concise and factual — do not invent details not present in the snippets.",
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
          summary = claudeData.content?.[0]?.text ?? "";
        } catch (err) {
          console.error("Anthropic request failed:", err);
          return Response.json({ error: "AI summary failed" }, { status: 502 });
        }

        return Response.json({ summary, results });
      },
    },
  },
});
