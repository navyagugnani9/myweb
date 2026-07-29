import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticated } from "@/lib/team-auth.server";

export const Route = createFileRoute("/api/team/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Response.json({ authenticated: isAuthenticated(request) });
      },
    },
  },
});
