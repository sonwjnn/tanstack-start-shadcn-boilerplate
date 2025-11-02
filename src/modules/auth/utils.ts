import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/modules/auth/store/auth-store";

export function requireAuth({ location }: { location: { href: string } }) {
	const {
		auth: { isAuthenticated },
	} = useAuthStore();

	if (!isAuthenticated) {
		throw redirect({
			to: "/sign-in",
			search: {
				redirect: location.href,
			},
		});
	}
}

export function requireUnauth() {
	const {
		auth: { isAuthenticated },
	} = useAuthStore();

	if (isAuthenticated) {
		throw redirect({
			to: "/",
		});
	}
}

export function requireRole(roles: string[], location: { href: string }) {
	const {
		auth: { isAuthenticated, user },
	} = useAuthStore();

	if (!isAuthenticated) {
		throw redirect({
			to: "/sign-in",
			search: {
				redirect: location.href,
			},
		});
	}

	const hasRole = user?.role.some((userRole) => roles.includes(userRole));
	if (!hasRole) {
		throw redirect({
			to: "/403",
		});
	}
}
