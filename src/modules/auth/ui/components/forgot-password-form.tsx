import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { sleep, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { forgotPasswordSchema } from "@/modules/auth/schemas";
import { TextField } from "@/components/forms/text-field";

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      // eslint-disable-next-line no-console
      console.log(value);

      toast.promise(sleep(2000), {
        loading: "Sending email...",
        success: () => {
          setIsLoading(false);
          form.reset();
          navigate({ to: "/otp" });
          return `Email sent to ${value.email}`;
        },
        error: "Error",
      });
    },
    validators: {
      onSubmit: forgotPasswordSchema,
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
      <form.Field name="email">
        {(field) => (
          <TextField
            field={field}
            label="Email"
            placeholder="Email"
            type="email"
            name={field.name}
            disabled={isLoading}
            requiredMark
          />
        )}
      </form.Field>
      <form.Subscribe>
        {(state) => (
          <Button
            className="mt-2 w-full"
            disabled={!state.canSubmit || state.isSubmitting || isLoading}
          >
            {state.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArrowRight />
            )}
            Continue
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
