import { FORM_RULES_HELPER } from "@/utils/form-rules-helper";
import z from "zod";

export const registerSchema = z.object({
  email: FORM_RULES_HELPER.REQUIRED_EMAIL(),
  password: FORM_RULES_HELPER.REQUIRED_STR(),
  name: z
    .string()
    .min(3, "Tên phải có ít nhất 3 ký tự")
    .max(63, "Tên phải có ít nhất 20 ký tự")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Tên chỉ được chứa chữ cái thường, số và dấu gạch ngang. Nó phải bắt đầu và kết thúc bằng chữ cái hoặc số"
    )
    .refine(
      (value) => !value.includes("--"),
      "Tên không được chứa dấu gạch ngang liên tiếp"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: FORM_RULES_HELPER.REQUIRED_EMAIL(),
  password: FORM_RULES_HELPER.REQUIRED_STR(),
});

export const otpSchema = z.object({
  otp: z.string().min(6, "Mã OTP phải có 6 ký tự"),
});

export const forgotPasswordSchema = z.object({
  email: FORM_RULES_HELPER.REQUIRED_EMAIL(),
});
