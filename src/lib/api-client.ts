import ky from "ky";
import { getCookie } from "@/lib/cookies";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { API_URL } from "@/utils/endpoints";

export const apiClient = ky.create({
	prefixUrl: API_URL,
	timeout: 30_000,
	retry: {
		limit: 2,
		methods: ["get", "post"],
		statusCodes: [408, 413, 429, 500, 502, 503, 504],
	},
	hooks: {
		beforeRequest: [
			(request) => {
				// Get token from cookie
				const tokenCookie = getCookie(ACCESS_TOKEN_COOKIE_NAME);
				const token = tokenCookie ? JSON.parse(tokenCookie) : null;

				if (token) {
					request.headers.set("Authorization", `Bearer ${token}`);
				}
			},
		],
		afterResponse: [
			(_request, _options, response) => {
				// Handle token refresh on 401
				if (response.status === 401) {
					// Token expired or invalid
					// Could implement automatic token refresh here
					console.warn("Unauthorized request - token may be expired");
				}
				return response;
			},
		],
	},
});

/**
 * Public API client without auth headers
 * Use for login, register, etc.
 */
export const publicApiClient = ky.create({
	prefixUrl: API_URL,
	timeout: 30_000,
	retry: {
		limit: 2,
		methods: ["get", "post"],
		statusCodes: [408, 413, 429, 500, 502, 503, 504],
	},
});
