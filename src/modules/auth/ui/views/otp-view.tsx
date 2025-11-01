import { Link } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { OtpForm } from "@/modules/auth/ui/components/otp-form";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";

export const OtpView = () => (
	<AuthLayout>
		<Card className="gap-4">
			<CardHeader>
				<CardTitle className="text-base tracking-tight">
					Two-factor Authentication
				</CardTitle>
				<CardDescription>
					Please enter the authentication code. <br /> We have sent the
					authentication code to your email.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<OtpForm />
			</CardContent>
			<CardFooter>
				<p className="px-8 text-center text-muted-foreground text-sm">
					Haven't received it?{" "}
					<Link
						className="underline underline-offset-4 hover:text-primary"
						to="/sign-in"
					>
						Resend a new code.
					</Link>
					.
				</p>
			</CardFooter>
		</Card>
	</AuthLayout>
);
