import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthContextType } from "@/modules/auth/store/auth-store";
import { DefaultCatchBoundaryView } from "@/modules/errors/ui/views/default-catch-boudary-view";
import { NotFoundErrorView } from "@/modules/errors/ui/views/not-found-error-view";

interface RouterContext {
	queryClient: QueryClient;
	auth: AuthContextType["auth"];
}

export const Route = createRootRouteWithContext<RouterContext>()({
	notFoundComponent: NotFoundErrorView,
	errorComponent: DefaultCatchBoundaryView,
	component: Outlet,
});
