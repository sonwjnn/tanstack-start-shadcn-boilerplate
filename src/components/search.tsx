import { Input } from "./ui/input";

type SearchProps = {
	className?: string;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
};

export function Search({ placeholder = "Search" }: SearchProps) {
	return (
		<Input
			className="w-full lg:w-52 xl:w-64"
			placeholder={placeholder}
			type="text"
		/>
	);
}
