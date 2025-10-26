import type { AnyFieldApi } from "@tanstack/react-form";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

interface DatePickerFieldProps {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
  requiredMark?: boolean;
  handleChange?: (val: Date | undefined) => void;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = (props) => {
  const {
    field,
    label = "",
    placeholder = "dd-MM-yyyy",
    requiredMark = false,
    handleChange,
  } = props;

  const handleDateChange = (date: Date | undefined) => {
    field.handleChange(date);
    handleChange?.(date);
  };

  return (
    <div>
      <Label htmlFor={field.name} className="mb-2 font-medium text-sm">
        {label} {requiredMark && <span className="-ml-1 text-rose-500">*</span>}
      </Label>
      <DatePicker
        id={field.name}
        value={field.state.value}
        onChange={handleDateChange}
        placeholder={placeholder}
      />
      {field.state.meta.errors?.length > 0 && (
        <p className="mt-1 text-rose-700 text-xs">
          {field.state.meta.errors?.[0]?.message || ""}
        </p>
      )}
    </div>
  );
};
