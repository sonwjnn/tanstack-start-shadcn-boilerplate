import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { GmailSvgIcon, GithubSvgIcon } from "@/assets/brand-icons";
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { sleep, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { loginSchema } from "@/modules/auth/schemas";
import { TextField } from "@/components/forms/text-field";
import { useForm } from "@tanstack/react-form";

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
    onSubmit: async ({ value }) => {
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

          // Redirect to the stored location or default to dashboard
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
            placeholder="Email"
            label="Email"
            type="email"
            name={field.name}
            requiredMark
          />
        )}
      </form.Field>

      <div className="relative">
        <form.Field name="password">
          {(field) => (
            <TextField
              field={field}
              label="Password"
              placeholder="********"
              type="password"
              name={field.name}
              requiredMark
            />
          )}
        </form.Field>
        <Link
          to="/forgot-password"
          className="text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75"
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
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" type="button" disabled={isLoading}>
          <GmailSvgIcon className="h-4 w-4" /> Gmail
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          <GithubSvgIcon className="h-4 w-4" /> Github
        </Button>
      </div>
    </form>
  );
};
