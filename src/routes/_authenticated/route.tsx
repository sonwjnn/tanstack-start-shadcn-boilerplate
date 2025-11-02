import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/modules/auth/ui/layouts/authenticated-layout";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context, location }) => {
		const isAuthenticated = context.auth?.isAuthenticated;

		if (!isAuthenticated) {
			throw redirect({
				to: "/sign-in",
				search: { redirect: location.href },
			});
		}
	},
	component: AuthenticatedLayout,
});
