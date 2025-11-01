import { useSearch } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/modules/auth/ui/components/sign-in-form";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";
export function SignInView() {
	const { redirect } = useSearch({ from: "/(auth)/sign-in" });

	return (
		<AuthLayout>
			<Card className="gap-4">
				<CardHeader>
					<CardTitle className="text-lg tracking-tight">Sign in</CardTitle>
					<CardDescription>
						Enter your email and password below to <br />
						log into your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SignInForm redirectTo={redirect} />
				</CardContent>
				<CardFooter>
					<p className="px-8 text-center text-muted-foreground text-sm">
						By clicking sign in, you agree to our{" "}
						<a
							className="underline underline-offset-4 hover:text-primary"
							href="/terms"
						>
							Terms of Service
						</a>{" "}
						and{" "}
						<a
							className="underline underline-offset-4 hover:text-primary"
							href="/privacy"
						>
							Privacy Policy
						</a>
						.
					</p>
				</CardFooter>
			</Card>
		</AuthLayout>
	);
}
