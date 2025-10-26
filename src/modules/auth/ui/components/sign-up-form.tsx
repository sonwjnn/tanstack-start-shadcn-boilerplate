import { useState } from "react";
import { GmailSvgIcon, GithubSvgIcon } from "@/assets/brand-icons";
import { Button } from "@/components/ui/button";

import { registerSchema } from "@/modules/auth/schemas";
import { useForm } from "@tanstack/react-form";
import { TextField } from "@/components/forms/text-field";
import { cn } from "@/lib/utils";

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
      // eslint-disable-next-line no-console
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
            placeholder="Name"
            label="Name"
            type="text"
            name={field.name}
            requiredMark
          />
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <TextField
            field={field}
            placeholder="Email"
            label="Email"
            type="email"
            name={field.name}
            requiredMark
          />
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <TextField
            field={field}
            placeholder="Password"
            label="Password"
            type="password"
            name={field.name}
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
            Create Account
          </Button>
        )}
      </form.Subscribe>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="w-full"
          type="button"
          disabled={isLoading}
        >
          <GithubSvgIcon className="h-4 w-4" /> GitHub
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          disabled={isLoading}
        >
          <GmailSvgIcon className="h-4 w-4" /> Gmail
        </Button>
      </div>
    </form>
  );
}
