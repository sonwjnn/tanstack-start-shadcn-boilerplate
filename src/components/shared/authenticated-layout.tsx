import { Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProvider } from "@/contexts/layout-provider";
import { getCookie } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./app-sidebar";

type AuthenticatedLayoutProps = {
	children?: React.ReactNode;
};

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
	const defaultOpen = getCookie("sidebar_state") !== "false";
	return (
		<LayoutProvider>
			<SidebarProvider defaultOpen={defaultOpen}>
				<AppSidebar />
				<SidebarInset
					className={cn(
						// Set content container, so we can use container queries
						"@container/content",

						// If layout is fixed, set the height
						// to 100svh to prevent overflow
						"has-[[data-layout=fixed]]:h-svh",

						// If layout is fixed and sidebar is inset,
						// set the height to 100svh - spacing (total margins) to prevent overflow
						"peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*4))]"
					)}
				>
					{children ?? <Outlet />}
				</SidebarInset>
			</SidebarProvider>
		</LayoutProvider>
	);
}
