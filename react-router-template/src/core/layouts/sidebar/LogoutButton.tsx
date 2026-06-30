import { LogOut } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './Sidebar';
import { cn } from '@/shared/lib';
import { useNavigationBlockStore } from '@/shared/stores/navigationBlock.store';
import { useAuthStore } from '@/core/stores/auth.store';

export function LogoutButton() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const { isBlocked, onBlockedNavigate } = useNavigationBlockStore();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    if (isBlocked) {
      onBlockedNavigate?.();
      return;
    }
    logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className={`${!isCollapsed && 'px-2'}`}>
        <SidebarMenuButton
          onClick={handleLogout}
          tooltip="Logout"
          className={cn(
            'flex cursor-pointer items-center',
            isCollapsed ? 'justify-center' : 'justify-between',
            'w-full rounded-xl',
            'border border-white/20',
            'bg-white/6 text-sidebar-foreground/80',
            'hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40',
            'transition-colors duration-200',
            'px-5 py-6'
          )}
        >
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          <LogOut className="size-4 shrink-0" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
