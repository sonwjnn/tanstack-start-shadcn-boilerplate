import { createFileRoute } from "@tanstack/react-router";
import { SignIn2View } from "@/modules/auth/ui/views/sign-in-2-view";

export const Route = createFileRoute("/(auth)/sign-in-2")({
  component: SignIn2View,
});
