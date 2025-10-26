import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { NotFoundErrorView } from "@/modules/errors/ui/views/not-found-error-view";
import { AppLoader } from "@/components/app-loader";
import { HeadContent } from "@tanstack/react-router";
import appCss from "@/styles/index.css?url";
import { seo } from "@/utils/seo";
import { DefaultCatchBoundaryView } from "@/modules/errors/ui/views/default-catch-boudary-view";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "TanStack Start",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: NotFoundErrorView,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundaryView {...props} />
      </RootDocument>
    );
  },
  component: RootComponent,
});

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  return (
    <RootDocument>
      {isFetching ? <AppLoader fullScreen /> : <Outlet />}
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster duration={5000} />
        {import.meta.env.MODE === "development" && (
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  );
}
