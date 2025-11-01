import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordView } from "@/modules/auth/ui/views/forgot-password-view";

export const Route = createFileRoute("/(auth)/forgot-password")({
	component: ForgotPasswordView,
});
