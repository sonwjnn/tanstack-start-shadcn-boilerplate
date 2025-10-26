import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
const searchSchema = z.object({
  redirect: z.string().optional(),
});
export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInView,
  validateSearch: searchSchema,
});
