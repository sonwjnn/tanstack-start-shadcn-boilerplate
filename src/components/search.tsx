import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type SearchProps = {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

export function Search({
  className = "",
  placeholder = "Search",
}: SearchProps) {
  return (
    <div
      className={cn(
        "bg-muted/25 group text-muted-foreground hover:bg-accent relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64",
        className
      )}
    >
      <Input type="text" className="w-full" placeholder={placeholder} />
    </div>
  );
}
