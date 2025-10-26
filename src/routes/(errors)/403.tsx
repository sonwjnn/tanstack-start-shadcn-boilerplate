import { createFileRoute } from "@tanstack/react-router";
import { ForbiddenErrorView } from "@/modules/errors/ui/views/forbidden-error-view";

export const Route = createFileRoute("/(errors)/403")({
  component: ForbiddenErrorView,
});
