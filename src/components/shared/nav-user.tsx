// import { SignOutDialog } from '@/components/sign-out-dialog'
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react";
// import useDialogState from '@/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/modules/auth/store/auth-store";

type NavUserProps = {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
};

export function NavUser({ user }: NavUserProps) {
	const { isMobile } = useSidebar();
	// const [open, setOpen] = useDialogState()
	const navigate = useNavigate();
	const location = useLocation();
	const { auth } = useAuthStore();

	const handleSignOut = () => {
		auth.reset();
		// Preserve current location for redirect after sign-in
		const currentPath = location.href;
		navigate({
			to: "/sign-in",
			search: { redirect: currentPath },
			replace: true,
		});
	};
	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								size="lg"
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage alt={user.name} src={user.avatar} />
									<AvatarFallback className="rounded-lg">SN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-start text-sm leading-tight">
									<span className="truncate font-semibold">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
								<ChevronsUpDown className="ms-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							side={isMobile ? "bottom" : "right"}
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage alt={user.name} src={user.avatar} />
										<AvatarFallback className="rounded-lg">SN</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-start text-sm leading-tight">
										<span className="truncate font-semibold">{user.name}</span>
										<span className="truncate text-xs">{user.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Sparkles />
									Upgrade to Pro
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									{/* <Link to='/settings/account'> */}
									<BadgeCheck />
									Account
									{/* </Link> */}
								</DropdownMenuItem>
								<DropdownMenuItem>
									{/* <Link to='/settings'> */}
									<CreditCard />
									Billing
									{/* </Link> */}
								</DropdownMenuItem>
								<DropdownMenuItem>
									{/* <Link to='/settings/notifications'> */}
									<Bell />
									Notifications
									{/* </Link> */}
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleSignOut} variant="destructive">
								<LogOut />
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>

			{/* <SignOutDialog open={!!open} onOpenChange={setOpen} /> */}
		</>
	);
}
