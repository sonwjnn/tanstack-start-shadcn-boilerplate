import type { AnyFieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

interface OtpFieldProps {
  field: AnyFieldApi;
  label?: string;
  requiredMark?: boolean;
}

export const OtpField: React.FC<OtpFieldProps> = ({
  field,
  label = "Verification Code",
  requiredMark = false,
}) => {
  return (
    <div>
      {label && (
        <Label htmlFor={field.name} className="mb-2 font-medium text-sm">
          {label}{" "}
          {requiredMark && <span className="-ml-1 text-rose-500">*</span>}
        </Label>
      )}
      <InputOTP
        maxLength={6}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {field.state.meta.errors?.length > 0 && (
        <p className="mt-1 text-rose-700 text-xs">
          {field.state.meta.errors[0]}
        </p>
      )}
    </div>
  );
};
