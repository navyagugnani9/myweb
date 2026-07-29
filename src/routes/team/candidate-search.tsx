import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Loader2, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/team/candidate-search")({
  head: () => ({
    meta: [{ title: "Candidate Search | AcadHire Team" }],
  }),
  component: CandidateSearchPage,
});

interface SearchResult {
  title: string;
  url: string;
  content: string;
}

function CandidateSearchPage() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/team/session")
      .then((r) => r.json())
      .then((d) => setAuthenticated(!!d.authenticated))
      .finally(() => setCheckingSession(false));
  }, []);

  if (checkingSession) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-teal" />
      </section>
    );
  }

  return authenticated ? (
    <SearchTool onLoggedOut={() => setAuthenticated(false)} />
  ) : (
    <PasswordGate onSuccess={() => setAuthenticated(true)} />
  );
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/team/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password.");
        return;
      }
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-20">
      <Card className="w-full max-w-sm p-8">
        <h1 className="text-xl font-bold text-foreground">Team Access</h1>
        <p className="mt-1.5 text-sm text-body">Internal tool. AcadHire staff only.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label className="text-sm font-medium text-foreground">Password</Label>
            <Input
              type="password"
              className="mt-1.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-navy hover:bg-navy/90 text-navy-foreground">
            {submitting ? "Checking…" : "Enter"}
          </Button>
        </form>
      </Card>
    </section>
  );
}

function SearchTool({ onLoggedOut }: { onLoggedOut: () => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await fetch("/api/team/candidate-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Search failed. Please try again.");
        setSummary("");
        setResults([]);
        return;
      }
      setSummary(data.summary);
      setResults(data.results);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/team/logout", { method: "POST" });
    onLoggedOut();
  };

  return (
    <section className="py-16">
      <div className="container-prose max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Candidate Search</h1>
            <p className="mt-1 text-sm text-body">
              Searches the public internet and summarizes results with AI. Won't reach LinkedIn/Naukri's own candidate databases — only publicly indexed content.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-3.5 w-3.5" /> Log out
          </Button>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Psychology teachers in Mumbai with online tutoring experience"
          />
          <Button type="submit" disabled={loading} className="shrink-0 bg-amber-cta hover:bg-amber-cta/90 text-amber-cta-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {loading ? "Searching…" : "Search"}
          </Button>
        </form>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {!loading && searched && !error && (
          <div className="mt-8 space-y-6">
            {summary && (
              <Card className="p-6">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI Summary</h2>
                <p className="mt-2 whitespace-pre-wrap text-body leading-relaxed">{summary}</p>
              </Card>
            )}

            {results.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sources</h2>
                <div className="mt-3 space-y-3">
                  {results.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-border p-4 transition-colors hover:border-teal/40"
                    >
                      <p className="flex items-center gap-1.5 font-semibold text-foreground">
                        {r.title} <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      </p>
                      <p className="mt-1 truncate text-xs text-teal">{r.url}</p>
                      <p className="mt-1.5 text-sm text-body line-clamp-2">{r.content}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
