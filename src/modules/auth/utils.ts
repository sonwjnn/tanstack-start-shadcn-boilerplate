// Example utils for auth
export const authUtils = {
	getAuthData: async () => {
		const response = await fetch("/api/auth");
		return response.json();
	},
};
