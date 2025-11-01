import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const DefaultCatchBoundaryView = ({ error }: ErrorComponentProps) => {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error("DefaultCatchBoundary Error:", error);

	return (
		<div className="flex h-svh flex-col items-center justify-center gap-6 p-4">
			<ErrorComponent error={error} />
			<div className="flex flex-wrap items-center gap-2">
				<Button
					className={
						"rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
					}
					onClick={() => {
						router.invalidate();
					}}
				>
					Try Again
				</Button>
				{isRoot ? (
					<Link
						className={
							"rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
						}
						to="/"
					>
						Home
					</Link>
				) : (
					<Link
						className={
							"rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
						}
						onClick={(e) => {
							e.preventDefault();
							window.history.back();
						}}
						to="/"
					>
						Go Back
					</Link>
				)}
			</div>
		</div>
	);
};
