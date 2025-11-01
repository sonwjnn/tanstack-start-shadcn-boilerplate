import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { GithubSvgIcon } from "@/assets/brand-icons/github-svg-icon";
import { GmailSvgIcon } from "@/assets/brand-icons/gmail-svg-icon";
import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/modules/auth/schemas";

export function SignUpForm({
	className,
	...props
}: React.HTMLAttributes<HTMLFormElement>) {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			await Promise.resolve();
			console.log(value);

			setTimeout(() => {
				setIsLoading(false);
			}, 3000);
		},
		validators: {
			onSubmit: registerSchema,
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
			<form.Field name="name">
				{(field) => (
					<TextField
						field={field}
						label="Name"
						name={field.name}
						placeholder="Name"
						requiredMark
						type="text"
					/>
				)}
			</form.Field>
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
			<form.Field name="password">
				{(field) => (
					<TextField
						field={field}
						label="Password"
						name={field.name}
						placeholder="Password"
						requiredMark
						type="password"
					/>
				)}
			</form.Field>

			<form.Subscribe>
				{(state) => (
					<Button
						className="mt-2 w-full"
						disabled={!state.canSubmit || state.isSubmitting || isLoading}
					>
						Create Account
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
				<Button
					className="w-full"
					disabled={isLoading}
					type="button"
					variant="outline"
				>
					<GithubSvgIcon className="h-4 w-4" /> GitHub
				</Button>
				<Button
					className="w-full"
					disabled={isLoading}
					type="button"
					variant="outline"
				>
					<GmailSvgIcon className="h-4 w-4" /> Gmail
				</Button>
			</div>
		</form>
	);
}
