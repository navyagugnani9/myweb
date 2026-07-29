import { createFileRoute } from "@tanstack/react-router";
import { clearCookieHeader } from "@/lib/team-auth.server";

export const Route = createFileRoute("/api/team/logout")({
  server: {
    handlers: {
      POST: async () => {
        return Response.json(
          { success: true },
          { headers: { "Set-Cookie": clearCookieHeader() } },
        );
      },
    },
  },
});
