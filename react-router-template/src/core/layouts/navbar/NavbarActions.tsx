import { Button } from '@/shared/components/ui/Button';
import { ModeToggle } from './ModeToggle';
import { LogOut } from 'lucide-react';
import { Separator } from '@/shared/components/ui/Separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/DropdownMenu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/Avatar';
import { useNavigationBlockStore } from '@/shared/stores/navigationBlock.store';
import { useAuthStore, useUser } from '@/core/stores/auth.store';
import { truncate } from '@/shared/utils';

const getInitials = (name: string) => {
  return name
    .split(/[@.\s_-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
};

export default function NavbarActions() {
  const { isBlocked, onBlockedNavigate } = useNavigationBlockStore();
  const logout = useAuthStore((s) => s.logout);
  const user = useUser();

  const displayName = user?.username ?? 'User';
  const email = user?.email ?? '';
  const initials = user ? getInitials(user.username) : 'U';

  const handleLogout = () => {
    if (isBlocked) {
      onBlockedNavigate?.();
      return;
    }
    logout();
  };

  return (
    <div className="ml-auto flex items-center gap-1">
      <div className="hidden sm:block">
        <ModeToggle />
      </div>

      {/* <Button
        variant="ghost"
        size="icon"
        className="hidden rounded-full text-muted-foreground sm:flex"
      >
        <Settings className="h-5 w-5 animate-spin animation-duration-[4000ms]" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="relative shrink-0 rounded-full"
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
          9
        </span>
      </Button> */}

      <Separator
        orientation="vertical"
        className="mx-2 shrink-0 data-[orientation=vertical]:h-6"
      />

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="relative h-10 shrink-0 gap-2 rounded-full pr-3 pl-1 hover:bg-accent"
            >
              <Avatar className="h-9 w-9 border-2 border-border">
                <AvatarImage
                  // src="https://packiko.blob.core.windows.net/warehouse-uat/packiko_logo_1.png"
                  alt={displayName}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium capitalize sm:inline">
                {truncate(displayName, 4)}
              </span>
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 p-0">
          <div className="p-4 pb-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12 shrink-0 border-2 border-border shadow-sm">
                <AvatarImage
                  // src="https://packiko.blob.core.windows.net/warehouse-uat/packiko_logo_1.png"
                  alt={displayName}
                />
                <AvatarFallback className="text-base font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
                <p className="truncate text-sm leading-none font-semibold capitalize">
                  {displayName}
                </p>
                <p className="mt-1 truncate text-xs leading-none text-muted-foreground">
                  {email}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="p-1">
            {/* <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 font-medium">
              <User className="mr-3 h-4 w-4 shrink-0" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 font-medium">
              <Settings className="mr-3 h-4 w-4 shrink-0" />
              <span>Settings</span>
            </DropdownMenuItem> */}

            <ModeToggle variant="menuitem" />
          </div>

          <Separator />

          <div className="p-1">
            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="cursor-pointer rounded-md px-3 py-2.5 font-medium"
            >
              <LogOut className="mr-3 h-4 w-4 shrink-0" />
              <span>Logout</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
