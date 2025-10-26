import { createFileRoute } from "@tanstack/react-router";
import { UnauthorisedErrorView } from "@/modules/errors/ui/views/unauthorized-error-view";

export const Route = createFileRoute("/(errors)/401")({
  component: UnauthorisedErrorView,
});
