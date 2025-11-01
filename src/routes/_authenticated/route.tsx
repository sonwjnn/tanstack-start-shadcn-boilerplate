import { createFileRoute } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/components/shared/authenticated-layout";

export const Route = createFileRoute("/_authenticated")({
	component: AuthenticatedLayout,
});
