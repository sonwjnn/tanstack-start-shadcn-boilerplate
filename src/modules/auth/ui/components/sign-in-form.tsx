import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TextField } from "@/components/forms/text-field";
import { GithubSvgIcon } from "@/components/svg-icons/github-svg-icon";
import { GmailSvgIcon } from "@/components/svg-icons/gmail-svg-icon";
import { Button } from "@/components/ui/button";
import { cn, sleep } from "@/lib/utils";
import { loginSchema } from "@/modules/auth/schemas";
import { useAuthStore } from "@/modules/auth/store/auth-store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
	redirectTo?: string;
}

export const SignInForm = ({
	className,
	redirectTo,
	...props
}: UserAuthFormProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { auth } = useAuthStore();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: ({ value }) => {
			setIsLoading(true);

			toast.promise(sleep(2000), {
				loading: "Signing in...",
				success: () => {
					setIsLoading(false);

					// Mock successful authentication with expiry computed at success time
					const mockUser = {
						accountNo: "ACC001",
						email: value.email,
						role: ["user"],
						exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
					};

					// Set user and access token
					auth.setUser(mockUser);
					auth.setAccessToken("mock-access-token");

					// Navigate - router context will update via __root.tsx useEffect
					const targetPath = redirectTo || "/";
					navigate({ to: targetPath, replace: true });

					return `Welcome back, ${value.email}!`;
				},
				error: "Error",
			});
		},
		validators: {
			onSubmit: loginSchema,
		},
	});

	return (
		<form
			{...props}
			className={cn("space-y-4", className)}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field name="email">
				{(field) => (
					<TextField
						field={field}
						label="Email"
						name={field.name}
						placeholder="Email"
						requiredMark
						type="email"
					/>
				)}
			</form.Field>

			<div className="relative">
				<form.Field name="password">
					{(field) => (
						<TextField
							field={field}
							label="Password"
							name={field.name}
							placeholder="********"
							requiredMark
							type="password"
						/>
					)}
				</form.Field>
				<Link
					className="-top-0.5 absolute end-0 font-medium text-muted-foreground text-sm hover:opacity-75"
					to="/forgot-password"
				>
					Forgot password?
				</Link>
			</div>

			<form.Subscribe>
				{(state) => (
					<Button
						className="mt-2 w-full"
						disabled={!state.canSubmit || state.isSubmitting}
					>
						{state.isSubmitting ? (
							<Loader2 className="animate-spin" />
						) : (
							<LogIn />
						)}
						Sign in
					</Button>
				)}
			</form.Subscribe>

			<div className="relative my-2">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<Button disabled={isLoading} type="button" variant="outline">
					<GmailSvgIcon className="h-4 w-4" /> Gmail
				</Button>
				<Button disabled={isLoading} type="button" variant="outline">
					<GithubSvgIcon className="h-4 w-4" /> Github
				</Button>
			</div>
		</form>
	);
};
