// Example schemas for dashboard
import { z } from "zod";

const dashboardSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export { dashboardSchema };
