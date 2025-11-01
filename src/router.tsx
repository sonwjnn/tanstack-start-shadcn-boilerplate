import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { handleServerError } from "@/lib/handle-server-error";
import { useAuthStore } from "./modules/auth/store/auth-store";
import { DefaultCatchBoundaryView } from "./modules/errors/ui/views/default-catch-boudary-view";
import { NotFoundErrorView } from "./modules/errors/ui/views/not-found-error-view";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: (failureCount, error) => {
					// eslint-disable-next-line no-console
					if (import.meta.env.DEV) {
						console.log({ failureCount, error });
					}

					if (failureCount >= 0 && import.meta.env.DEV) {
						return false;
					}
					if (failureCount > 3 && import.meta.env.PROD) {
						return false;
					}

					return !(
						error instanceof AxiosError &&
						[401, 403].includes(error.response?.status ?? 0)
					);
				},
				refetchOnWindowFocus: import.meta.env.PROD,
				staleTime: 10 * 1000, // 10s
			},
			mutations: {
				onError: (error) => {
					handleServerError(error);

					if (error instanceof AxiosError && error.response?.status === 304) {
						toast.error("Content not modified!");
					}
				},
			},
		},
		queryCache: new QueryCache({
			onError: (error) => {
				if (error instanceof AxiosError) {
					if (error.response?.status === 401) {
						toast.error("Session expired!");
						useAuthStore.getState().auth.reset();
						const redirect = `${router.history.location.href}`;
						router.navigate({ to: "/sign-in", search: { redirect } });
					}
					if (error.response?.status === 500) {
						toast.error("Internal Server Error!");
						router.navigate({ to: "/500" });
					}
					if (error.response?.status === 403) {
						toast.error("Forbidden!");
						router.navigate({ to: "/403" });
					}
				}
			},
		}),
	});

	// Create a new router instance
	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: DefaultCatchBoundaryView,
		defaultNotFoundComponent: NotFoundErrorView,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
