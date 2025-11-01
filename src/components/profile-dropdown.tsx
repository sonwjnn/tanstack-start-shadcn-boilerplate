// import useDialogState from '@/hooks/use-dialog-state'

import { useLocation, useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/modules/auth/store/auth-store";

export const ProfileDropdown = () => {
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
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="relative h-8 w-8 rounded-full" variant="ghost">
						<Avatar className="h-8 w-8">
							<AvatarImage alt="@shadcn" src="/avatars/01.png" />
							<AvatarFallback>SN</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col gap-1.5">
							<p className="font-medium text-sm leading-none">satnaing</p>
							<p className="text-muted-foreground text-xs leading-none">
								satnaingdev@gmail.com
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							{/* <Link to='/settings'> */}
							Profile
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							{/* </Link> */}
						</DropdownMenuItem>
						<DropdownMenuItem>
							{/* <Link to='/settings'> */}
							Billing
							<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
							{/* </Link> */}
						</DropdownMenuItem>
						<DropdownMenuItem>
							{/* <Link to='/settings'> */}
							Settings
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
							{/* </Link> */}
						</DropdownMenuItem>
						<DropdownMenuItem>New Team</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleSignOut} variant="destructive">
						Sign out
						<DropdownMenuShortcut className="text-current">
							⇧⌘Q
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* <SignOutDialog open={!!open} onOpenChange={setOpen} /> */}
		</>
	);
};
