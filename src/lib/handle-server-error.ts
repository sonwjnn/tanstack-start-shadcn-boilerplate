import { HTTPError } from "ky";
import { toast } from "sonner";

export async function handleServerError(error: unknown) {
	console.log("[handleServerError] error", error);

	let errMsg = "Something went wrong!";

	if (
		error &&
		typeof error === "object" &&
		"status" in error &&
		Number(error.status) === 204
	) {
		errMsg = "Content not found.";
	}

	if (error instanceof HTTPError) {
		try {
			const errorData = await error.response.json();
			errMsg = errorData.title || errorData.message || errMsg;
		} catch {
			// If JSON parsing fails, use default message
			errMsg = error.message || errMsg;
		}
	}

	toast.error(errMsg);
}
