import { createFileRoute } from "@tanstack/react-router";
import { NotFoundErrorView } from "@/modules/errors/ui/views/not-found-error-view";

export const Route = createFileRoute("/(errors)/404")({
  component: NotFoundErrorView,
});
