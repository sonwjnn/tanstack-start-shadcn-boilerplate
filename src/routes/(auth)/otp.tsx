import { createFileRoute } from "@tanstack/react-router";
import { OtpView } from "@/modules/auth/ui/views/otp-view";

export const Route = createFileRoute("/(auth)/otp")({
  component: OtpView,
});
