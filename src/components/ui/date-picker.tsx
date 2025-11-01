import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DATE_FORMAT } from "@/utils/constants";
import {
	convertToDate,
	formatDate,
	isDateInRange,
	parseStringToDate,
} from "@/utils/date-helper";

export interface BaseDatePickerProps {
	value?: Date | string;
	onChange?: (date: Date | undefined) => void;
	onBlur?: () => void;
	placeholder?: string;
	disabled?: boolean;
	defaultValue?: Date | string;
	className?: string;
	format?: string;
	minDate?: Date;
	maxDate?: Date;
	id?: string;
}

export const DatePicker = React.forwardRef<
	React.ComponentRef<typeof Input>,
	BaseDatePickerProps
>(
	(
		{
			value,
			onChange,
			onBlur,
			placeholder = "dd-MM-yyyy",
			disabled = false,
			className = "",
			format = DATE_FORMAT,
			minDate,
			maxDate,
			id,
			defaultValue,
			...restProps
		},
		ref
	) => {
		const initialDate = React.useMemo(() => convertToDate(value), [value]);

		const [open, setOpen] = React.useState(false);
		const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
			initialDate
		);
		const [month, setMonth] = React.useState<Date>(initialDate || new Date());
		const [inputValue, setInputValue] = React.useState(
			formatDate(initialDate, format)
		);
		const [isTyping, setIsTyping] = React.useState(false);

		React.useEffect(() => {
			const newDate = convertToDate(value);
			setSelectedDate(newDate);
			setInputValue(formatDate(newDate, format));
			if (newDate) setMonth(newDate);
		}, [value, format]);

		const defaultInputValue = React.useMemo(
			() => formatDate(convertToDate(defaultValue), format),
			[defaultValue, format]
		);

		const handleDateSelect = (date: Date | undefined) => {
			if (!date) return;

			if (!isDateInRange(date, minDate, maxDate)) return;

			setSelectedDate(date);
			setInputValue(formatDate(date, format));
			setMonth(date);
			setOpen(false);
			setIsTyping(false);

			onChange?.(date);
		};

		// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <>
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let newValue = e.target.value.replace(/\D/g, ""); // Only keep numbers

			// Limit to maximum 8 digits
			if (newValue.length > 8) {
				newValue = newValue.slice(0, 8);
			}

			// Format according to dd-MM-yyyy pattern
			if (newValue.length >= 3 && newValue.length <= 4) {
				newValue = `${newValue.slice(0, 2)}-${newValue.slice(2)}`;
			} else if (newValue.length >= 5) {
				newValue = `${newValue.slice(0, 2)}-${newValue.slice(
					2,
					4
				)}-${newValue.slice(4)}`;
			}

			if (newValue.length === 10) {
				const parsed = parseStringToDate(newValue, format);
				if (parsed && !isDateInRange(parsed, minDate, maxDate)) {
					if (minDate && maxDate) {
						toast.error(
							`Ngày phải trong khoảng từ ${formatDate(
								minDate,
								format
							)} đến ${formatDate(maxDate, format)}`
						);
					} else if (minDate && !maxDate) {
						toast.error(
							`Ngày phải lớn hơn hoặc bằng ${formatDate(minDate, format)}`
						);
					} else if (!minDate && maxDate) {
						toast.error(
							`Ngày phải nhỏ hơn hoặc bằng ${formatDate(maxDate, format)}`
						);
					}
				}
			}

			setInputValue(newValue);
			setIsTyping(true);
		};

		const handleInputBlur = () => {
			if (isTyping) {
				const parsedDate = parseStringToDate(inputValue, format);
				if (parsedDate && isDateInRange(parsedDate, minDate, maxDate)) {
					setSelectedDate(parsedDate);
					setMonth(parsedDate);
					onChange?.(parsedDate);
				} else {
					// Reset to previous valid date if input is invalid
					setInputValue(formatDate(selectedDate, format));
				}
				setIsTyping(false);
			}
			onBlur?.();
		};

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === "ArrowDown" && !disabled) {
				e.preventDefault();
				setOpen(true);
			}
			if (e.key === "Escape") {
				setOpen(false);
			}
			if (e.key === "Enter") {
				handleInputBlur();
			}
		};

		return (
			<div className={cn("relative", className)}>
				<Input
					{...restProps}
					className="h-12 pr-10"
					defaultValue={defaultInputValue}
					disabled={disabled}
					id={id}
					onBlur={handleInputBlur}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					ref={ref}
					value={inputValue}
				/>
				<Popover onOpenChange={setOpen} open={open && !disabled}>
					<PopoverTrigger asChild>
						<Button
							className="-translate-y-1/2 absolute top-1/2 right-2 h-6 w-6 hover:bg-transparent"
							disabled={disabled}
							onClick={() => !disabled && setOpen(!open)}
							size="icon"
							tabIndex={-1}
							type="button"
							variant="ghost"
						>
							<CalendarIcon className="h-4 w-4 text-muted-foreground" />
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="w-auto p-0">
						<Calendar
							disabled={(date) => !isDateInRange(date, minDate, maxDate)}
							mode="single"
							month={month}
							onMonthChange={setMonth}
							onSelect={handleDateSelect}
							selected={selectedDate}
						/>
					</PopoverContent>
				</Popover>
			</div>
		);
	}
);

DatePicker.displayName = "DatePicker";
