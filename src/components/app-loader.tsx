import { cn } from "@/lib/utils";

interface LoaderProps {
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
	fullScreen?: boolean;
	color?: "primary" | "orange" | "blue" | "green" | "red";
}

const sizeConfig = {
	sm: {
		container: "w-6 h-6",
		dot: "w-2.5 h-2.5",
	},
	md: {
		container: "w-8 h-8",
		dot: "w-3.5 h-3.5",
	},
	lg: {
		container: "w-12 h-12",
		dot: "w-5 h-5",
	},
	xl: {
		container: "w-16 h-16",
		dot: "w-7 h-7",
	},
};

const colorConfig = {
	primary: "bg-primary",
	orange: "bg-orange-600",
	blue: "bg-blue-600",
	green: "bg-green-600",
	red: "bg-red-600",
};

export const AppLoader = ({
	size = "md",
	className,
	fullScreen = false,
	color = "orange",
}: LoaderProps) => {
	const containerSize = sizeConfig[size].container;
	const dotSize = sizeConfig[size].dot;
	const dotColor = colorConfig[color];

	const loaderContent = (
		<div className={cn("relative rotate-45 transform", containerSize)}>
			{/* Top Left */}
			<div
				className={cn("absolute animate-ping", dotSize, dotColor)}
				style={{
					top: 0,
					left: 0,
					animationDuration: "1.2s",
				}}
			/>

			{/* Top Right */}
			<div
				className={cn("absolute animate-ping", dotSize, dotColor)}
				style={{
					top: 0,
					right: 0,
					animationDuration: "1.2s",
					animationDelay: "0.15s",
				}}
			/>

			{/* Bottom Right */}
			<div
				className={cn("absolute animate-ping", dotSize, dotColor)}
				style={{
					bottom: 0,
					right: 0,
					animationDuration: "1.2s",
					animationDelay: "0.3s",
				}}
			/>

			{/* Bottom Left */}
			<div
				className={cn("absolute animate-ping", dotSize, dotColor)}
				style={{
					bottom: 0,
					left: 0,
					animationDuration: "1.2s",
					animationDelay: "0.45s",
				}}
			/>
		</div>
	);

	if (fullScreen) {
		return (
			<div
				className={cn(
					"fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
					className
				)}
			>
				{loaderContent}
			</div>
		);
	}

	return (
		<div
			className={cn("flex h-full items-center justify-center pt-8", className)}
		>
			{loaderContent}
		</div>
	);
};

// Export variants cho các use cases khác nhau
export function LoaderFullScreen({
	size,
	color,
}: Pick<LoaderProps, "size" | "color">) {
	return <AppLoader color={color} fullScreen size={size} />;
}

export function LoaderInline({
	size = "sm",
	color,
}: Pick<LoaderProps, "size" | "color">) {
	return (
		<div className="inline-flex items-center justify-center">
			<div
				className={cn(
					"relative rotate-45 transform",
					sizeConfig[size].container
				)}
			>
				<div
					className={cn(
						"absolute animate-ping",
						sizeConfig[size].dot,
						colorConfig[color || "orange"]
					)}
					style={{
						top: 0,
						left: 0,
						animationDuration: "1.2s",
					}}
				/>
				<div
					className={cn(
						"absolute animate-ping",
						sizeConfig[size].dot,
						colorConfig[color || "orange"]
					)}
					style={{
						top: 0,
						right: 0,
						animationDuration: "1.2s",
						animationDelay: "0.15s",
					}}
				/>
				<div
					className={cn(
						"absolute animate-ping",
						sizeConfig[size].dot,
						colorConfig[color || "orange"]
					)}
					style={{
						bottom: 0,
						right: 0,
						animationDuration: "1.2s",
						animationDelay: "0.3s",
					}}
				/>
				<div
					className={cn(
						"absolute animate-ping",
						sizeConfig[size].dot,
						colorConfig[color || "orange"]
					)}
					style={{
						bottom: 0,
						left: 0,
						animationDuration: "1.2s",
						animationDelay: "0.45s",
					}}
				/>
			</div>
		</div>
	);
}
