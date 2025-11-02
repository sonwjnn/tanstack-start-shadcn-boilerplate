import { create } from "zustand";
import { getCookie, removeCookie, setCookie } from "@/lib/cookies";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";

interface AuthUser {
	accountNo: string;
	email: string;
	role: string[];
	exp: number;
}

interface AuthState {
	user: AuthUser | null;
	accessToken: string;
	isAuthenticated: boolean;
}

interface AuthActions {
	setUser: (user: AuthUser | null) => void;
	setAccessToken: (accessToken: string) => void;
	resetAccessToken: () => void;
	reset: () => void;
}

export interface AuthContextType {
	auth: AuthState & AuthActions;
}

export const useAuthStore = create<AuthContextType>()((set) => {
	const cookieState = getCookie(ACCESS_TOKEN_COOKIE_NAME);
	const initToken = cookieState ? JSON.parse(cookieState) : "";

	return {
		auth: {
			user: null,
			accessToken: initToken,
			isAuthenticated: !!initToken,

			setUser: (user) =>
				set((state) => ({
					auth: { ...state.auth, user },
				})),
			setAccessToken: (accessToken) =>
				set((state) => {
					setCookie(ACCESS_TOKEN_COOKIE_NAME, JSON.stringify(accessToken));
					return {
						auth: {
							...state.auth,
							accessToken,
							isAuthenticated: !!accessToken,
						},
					};
				}),
			resetAccessToken: () =>
				set((state) => {
					removeCookie(ACCESS_TOKEN_COOKIE_NAME);
					return {
						auth: {
							...state.auth,
							accessToken: "",
							isAuthenticated: false,
						},
					};
				}),
			reset: () =>
				set((state) => {
					removeCookie(ACCESS_TOKEN_COOKIE_NAME);
					return {
						auth: {
							...state.auth,
							user: null,
							accessToken: "",
							isAuthenticated: false,
						},
					};
				}),
		},
	};
});
