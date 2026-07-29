import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { checkPassword, sessionCookieHeader } from "@/lib/team-auth.server";

const BodySchema = z.object({
  password: z.string().min(1),
});

export const Route = createFileRoute("/api/team/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = BodySchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        if (!(await checkPassword(parsed.password))) {
          return Response.json({ error: "Incorrect password" }, { status: 401 });
        }

        return Response.json(
          { success: true },
          { headers: { "Set-Cookie": await sessionCookieHeader() } },
        );
      },
    },
  },
});
