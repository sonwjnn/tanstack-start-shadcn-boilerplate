import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";
import { AppLoader } from "@/components/app-loader";
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
	component: RootComponent,
});

function RootComponent() {
	const isFetching = useRouterState({
		select: (s) => s.isLoading,
	});

	return isFetching ? <AppLoader fullScreen /> : <Outlet />;
}
