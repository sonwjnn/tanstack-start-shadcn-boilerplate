import type z from "zod";
import type {
	forgotPasswordSchema,
	loginSchema,
	otpSchema,
	registerSchema,
} from "@/modules/auth/schemas";

export type TAuthUser = {
	accountNo: string;
	email: string;
	name?: string;
	role: string[];
	exp: number;
};

export type TLoginRequest = z.infer<typeof loginSchema>;

export type TRegisterRequest = z.infer<typeof registerSchema>;

export type TForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;

export type TOtpRequest = z.infer<typeof otpSchema>;

export type TLoginResponse = {
	user: TAuthUser;
	accessToken: string;
	refreshToken?: string;
};

export type TRegisterResponse = {
	user: TAuthUser;
	accessToken: string;
	refreshToken?: string;
};

export type TRefreshTokenResponse = {
	accessToken: string;
};
