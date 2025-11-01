import { useNavigate, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const NotFoundErrorView = () => {
	const navigate = useNavigate();
	const { history } = useRouter();
	return (
		<div className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				<h1 className="font-bold text-[7rem] leading-tight">404</h1>
				<span className="font-medium">Oops! Page Not Found!</span>
				<p className="text-center text-muted-foreground">
					It seems like the page you're looking for <br />
					does not exist or might have been removed.
				</p>
				<div className="mt-6 flex gap-4">
					<Button onClick={() => history.go(-1)} variant="outline">
						Go Back
					</Button>
					<Button onClick={() => navigate({ to: "/" })}>Back to Home</Button>
				</div>
			</div>
		</div>
	);
};
