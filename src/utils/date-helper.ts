import { format, isAfter, isBefore, isEqual, isValid, parse } from "date-fns";
import { vi } from "date-fns/locale";

/**
 * Convert various date formats to Date object
 */
export function convertToDate(value?: Date | string | null): Date | undefined {
	if (!value) return;

	if (value instanceof Date) {
		return isValid(value) ? value : undefined;
	}

	if (typeof value === "string") {
		// Try parsing with different formats
		const formats = ["dd-MM-yyyy", "yyyy-MM-dd", "MM/dd/yyyy"];

		for (const formatStr of formats) {
			try {
				const parsed = parse(value, formatStr, new Date());
				if (isValid(parsed)) {
					return parsed;
				}
			} catch {
				// Do nothing
			}
		}

		// Try native Date parsing as fallback
		const nativeDate = new Date(value);
		return isValid(nativeDate) ? nativeDate : undefined;
	}

	return;
}

/**
 * Format date to string
 */
export function formatDate(
	date?: Date | null,
	formatStr = "dd-MM-yyyy"
): string {
	if (!(date && isValid(date))) return "";

	try {
		return format(date, formatStr, { locale: vi });
	} catch {
		return "";
	}
}

/**
 * Parse string to date with specific format
 */
export function parseStringToDate(
	dateString: string,
	formatStr = "dd-MM-yyyy"
): Date | undefined {
	if (!dateString) return;

	try {
		const parsed = parse(dateString, formatStr, new Date());
		return isValid(parsed) ? parsed : undefined;
	} catch {
		return;
	}
}

/**
 * Check if date is within range
 */
export function isDateInRange(
	date: Date,
	minDate?: Date | null,
	maxDate?: Date | null
): boolean {
	if (!isValid(date)) return false;

	if (minDate && isValid(minDate) && isBefore(date, minDate)) {
		return false;
	}

	if (maxDate && isValid(maxDate) && isAfter(date, maxDate)) {
		return false;
	}

	return true;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1?: Date | null, date2?: Date | null): boolean {
	if (!(date1 && date2 && isValid(date1) && isValid(date2))) return false;

	return isEqual(
		new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()),
		new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
	);
}
