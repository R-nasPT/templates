import { SidebarBrand } from './SidebarBrand';
import { MainMenu } from './MainMenu';
import { LogoutButton } from './LogoutButton';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from './Sidebar';
import { ScrollArea } from '@/shared/components/ui/ScrollArea';
import { useUser } from '@/core/stores/auth.store';
import SIDEBAR_MENU from '../constants/sidebar.constants';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();
  const userRoles = user?.roles ?? [];

  const visibleMenu = SIDEBAR_MENU
    .filter((item) =>
      !item.requiredRoles ||
      item.requiredRoles.some((role) => userRoles.includes(role))
    )
    .map(({ requiredRoles: _requiredRoles, ...rest }) => rest);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <MainMenu items={visibleMenu} />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
