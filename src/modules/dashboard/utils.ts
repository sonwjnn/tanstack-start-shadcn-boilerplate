// Example utils for dashboard
export const dashboardUtils = {
	getDashboardData: async () => {
		const response = await fetch("/api/dashboard");
		return response.json();
	},
};

export default dashboardUtils;
