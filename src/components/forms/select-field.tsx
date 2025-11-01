import type { AnyFieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectFieldProps {
	field: AnyFieldApi;
	label: string;
	options: SelectOption[];
	placeholder?: string;
	requiredMark?: boolean;
	handleChange?: (val: string) => void;
	disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = (props) => {
	const {
		field,
		label = "",
		options = [],
		placeholder = "Chọn...",
		requiredMark = false,
		handleChange,
		disabled = false,
	} = props;

	const handleValueChange = (value: string) => {
		field.handleChange(value);
		handleChange?.(value);
	};

	return (
		<div>
			<Label className="mb-2 font-medium text-sm" htmlFor={field.name}>
				{label} {requiredMark && <span className="-ml-1 text-rose-500">*</span>}
			</Label>
			<Select
				disabled={disabled}
				onValueChange={handleValueChange}
				value={field.state.value || ""}
			>
				<SelectTrigger className="h-12! w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{field.state.meta.errors?.length > 0 && (
				<p className="mt-1 text-rose-700 text-xs">
					{field.state.meta.errors?.[0]?.message || ""}
				</p>
			)}
		</div>
	);
};
