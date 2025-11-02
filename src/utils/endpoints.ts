export const SERVER_URL =
	import.meta.env.VITE_SERVER_URL || ("http://localhost:8000" as string);
export const API_URL = `${SERVER_URL}/api/v1`;

export const ENDPOINTS = {
	AUTH: {
		LOGIN: "auth/login",
		REGISTER: "auth/register",
		LOGOUT: "auth/logout",
		ME: "auth/me",
		REFRESH: "auth/refresh",
		FORGOT_PASSWORD: "auth/forgot-password",
		VERIFY_OTP: "auth/verify-otp",
		RESET_PASSWORD: "auth/reset-password",
	},
} as const;
