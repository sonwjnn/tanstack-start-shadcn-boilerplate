import "./styles/index.css";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { getRouter } from "@/router";

function App() {
	const { auth } = useAuthStore();
	const router = getRouter();
	return (
		<>
			<RouterProvider
				context={{
					auth,
					queryClient: router.options.context.queryClient,
				}}
				router={router}
			/>
			<Toaster duration={5000} />
			{import.meta.env.MODE === "development" && (
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			)}
		</>
	);
}

export default App;
