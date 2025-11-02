import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: ({ context }) => {
		const accessToken = context.auth?.accessToken;

		if (accessToken) {
			console.log("[(auth)] Has token, redirecting to /");
			throw redirect({ to: "/" });
		}
	},
});
