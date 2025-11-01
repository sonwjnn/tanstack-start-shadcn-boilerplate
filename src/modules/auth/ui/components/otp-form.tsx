import { useForm } from "@tanstack/react-form";

import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OtpField } from "@/components/forms/otp-field";
import { Button } from "@/components/ui/button";
// import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from "@/lib/utils";
import { otpSchema } from "@/modules/auth/schemas";

type OtpFormProps = React.HTMLAttributes<HTMLFormElement>;

export const OtpForm = ({ className, ...props }: OtpFormProps) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { otp: "" },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			await Promise.resolve();
			console.log(value);
			setTimeout(() => {
				setIsLoading(false);
				navigate({ to: "/" });
			}, 1000);
		},
		validators: {
			onSubmit: otpSchema,
		},
	});

	return (
		<form
			className={cn("grid gap-2", className)}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			{...props}
		>
			<form.Field name="otp">
				{(field) => <OtpField field={field} label="One-Time Password" />}
			</form.Field>

			<form.Subscribe>
				{(state) => (
					<Button
						className="mt-2"
						disabled={
							!state.canSubmit ||
							form.getFieldValue("otp").length < 6 ||
							isLoading
						}
					>
						Verify
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
};
