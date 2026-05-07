import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { FloatingButtons } from "@/components/site/FloatingButtons";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-display text-foreground">This piece is no longer in our atelier</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for has moved or been retired.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition">
            Return Home
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
        <h1 className="font-display text-2xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again or return home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-widest">Try again</button>
          <a href="/" className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest">Home</a>
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
      { title: "Dilip Furniture — Heirloom craftsmanship for modern living" },
      { name: "description", content: "Hand-finished luxury furniture, made in India. Sofas, beds, dining tables and decor delivered in 15–20 days." },
      { property: "og:title", content: "Dilip Furniture — Heirloom craftsmanship for modern living" },
      { property: "og:description", content: "Hand-finished luxury furniture, made in India. Sofas, beds, dining tables and decor delivered in 15–20 days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dilip Furniture — Heirloom craftsmanship for modern living" },
      { name: "twitter:description", content: "Hand-finished luxury furniture, made in India. Sofas, beds, dining tables and decor delivered in 15–20 days." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b87cf6e2-b86c-4b0a-92e2-049cb75ea55e/id-preview-6e2afc99--7a4aeb33-32ba-4512-b154-82a88450c060.lovable.app-1778132532022.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b87cf6e2-b86c-4b0a-92e2-049cb75ea55e/id-preview-6e2afc99--7a4aeb33-32ba-4512-b154-82a88450c060.lovable.app-1778132532022.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" },
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="pt-16 sm:pt-20 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingButtons />
      <Toaster position="bottom-left" />
    </QueryClientProvider>
  );
}
