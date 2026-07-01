import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-navy-foreground hover:bg-navy/90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-navy-foreground hover:bg-navy/90">
            Try again
          </button>
          <a href="/" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AcadHire | Specialist Recruitment for Schools & Education Companies" },
      { name: "description", content: "AcadHire is a specialist recruitment consultancy helping schools, EdTech companies, and education organizations hire verified academic, leadership, and operations talent." },
      { name: "author", content: "AcadHire" },
      { property: "og:title", content: "AcadHire | Specialist Recruitment for Schools & Education Companies" },
      { property: "og:description", content: "AcadHire is a specialist recruitment consultancy helping schools, EdTech companies, and education organizations hire verified academic, leadership, and operations talent." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AcadHire" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "AcadHire | Specialist Recruitment for Schools & Education Companies" },
      { name: "twitter:description", content: "AcadHire is a specialist recruitment consultancy helping schools, EdTech companies, and education organizations hire verified academic, leadership, and operations talent." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f64351a2-b208-47af-b00d-4b53d03915b7" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f64351a2-b208-47af-b00d-4b53d03915b7" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollToTopOnRouteChange() {
  const router = useRouter();
  useEffect(() => {
    const unsub = router.subscribe("onResolved", () => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
    return unsub;
  }, [router]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTopOnRouteChange />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <BackToTop />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
