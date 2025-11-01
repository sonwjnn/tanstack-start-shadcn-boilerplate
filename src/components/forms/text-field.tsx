import type { AnyFieldApi } from "@tanstack/react-form";
import { type BaseInputProps, Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextFieldProps extends BaseInputProps {
	field: AnyFieldApi;
	label: string;
	requiredMark?: boolean;
	handleChange?: (val: string) => void;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
	const {
		field,
		label = "",
		requiredMark = false,
		handleChange,
		...rest
	} = props;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		field.handleChange(e.target.value);
		handleChange?.(e.target.value);
	};

	return (
		<div>
			<Label className="mb-2 font-medium text-sm" htmlFor={field.name}>
				{label} {requiredMark && <span className="-ml-1 text-rose-500">*</span>}
			</Label>
			<Input
				{...rest}
				id={field.name}
				name={field.name}
				onChange={handleInputChange}
				value={field.state.value}
			/>
			{field.state.meta.errors?.length > 0 && (
				<p className="mt-1 text-rose-700 text-xs">
					{field.state.meta.errors?.[0]?.message || ""}
				</p>
			)}
		</div>
	);
};
