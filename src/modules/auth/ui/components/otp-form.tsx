import { useState } from "react";

import { useNavigate } from "@tanstack/react-router";
// import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useForm } from "@tanstack/react-form";
import { OtpField } from "@/components/forms/otp-field";
import { otpSchema } from "@/modules/auth/schemas";
type OtpFormProps = React.HTMLAttributes<HTMLFormElement>;

export const OtpForm = ({ className, ...props }: OtpFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
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
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn("grid gap-2", className)}
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
