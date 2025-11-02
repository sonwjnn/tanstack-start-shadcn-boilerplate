import { apiClient, publicApiClient } from "@/lib/api-client";
import type {
	TAuthUser,
	TForgotPasswordRequest,
	TLoginRequest,
	TLoginResponse,
	TOtpRequest,
	TRefreshTokenResponse,
	TRegisterRequest,
	TRegisterResponse,
} from "@/modules/auth/types";

import { ENDPOINTS } from "@/utils/endpoints";

export function login(data: TLoginRequest): Promise<TLoginResponse> {
	return publicApiClient
		.post(ENDPOINTS.AUTH.LOGIN, {
			json: data,
		})
		.json<TLoginResponse>();
}

export function register(data: TRegisterRequest): Promise<TRegisterResponse> {
	return publicApiClient
		.post(ENDPOINTS.AUTH.REGISTER, {
			json: data,
		})
		.json<TRegisterResponse>();
}

export function logout(): Promise<void> {
	return apiClient.post(ENDPOINTS.AUTH.LOGOUT).json();
}

export function getCurrentUser(): Promise<TAuthUser> {
	return apiClient.get(ENDPOINTS.AUTH.ME).json<TAuthUser>();
}

export function refreshToken(token: string): Promise<TRefreshTokenResponse> {
	return publicApiClient
		.post(ENDPOINTS.AUTH.REFRESH, {
			json: { refreshToken: token },
		})
		.json<TRefreshTokenResponse>();
}

export function forgotPassword(
	data: TForgotPasswordRequest
): Promise<{ message: string }> {
	return publicApiClient
		.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
			json: data,
		})
		.json<{ message: string }>();
}

export function verifyOtp(
	data: TOtpRequest
): Promise<{ message: string; verified: boolean }> {
	return publicApiClient
		.post(ENDPOINTS.AUTH.VERIFY_OTP, {
			json: data,
		})
		.json<{ message: string; verified: boolean }>();
}
