import { Link } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/modules/auth/ui/components/forgot-password-form";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";

export const ForgotPasswordView = () => (
	<AuthLayout>
		<Card className="gap-4">
			<CardHeader>
				<CardTitle className="text-lg tracking-tight">
					Forgot Password
				</CardTitle>
				<CardDescription>
					Enter your registered email and <br /> we will send you a link to
					reset your password.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ForgotPasswordForm />
			</CardContent>
			<CardFooter>
				<p className="mx-auto text-balance px-8 text-center text-muted-foreground text-sm">
					Don't have an account?{" "}
					<Link
						className="underline underline-offset-4 hover:text-primary"
						to="/sign-up"
					>
						Sign up
					</Link>
					.
				</p>
			</CardFooter>
		</Card>
	</AuthLayout>
);
