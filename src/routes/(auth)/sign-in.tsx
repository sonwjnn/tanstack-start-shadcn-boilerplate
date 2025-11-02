import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

const searchSchema = z.object({
	redirect: z.string().optional(),
});

export const Route = createFileRoute("/(auth)/sign-in")({
	component: SignInView,
	validateSearch: searchSchema,
});
