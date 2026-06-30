import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useLocation } from 'react-router';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './Sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/Collapsible';
import { BlockedLink } from '@/shared/components/common/BlockedLink';

type SubMenuItem = {
  title: string;
  url: string;
};

type MenuItemWithSub = {
  title: string;
  icon?: LucideIcon;
  items: SubMenuItem[];
};

type MenuItemWithoutSub = {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: never;
};

type MenuItem = MenuItemWithSub | MenuItemWithoutSub;

export function MainMenu({ items }: { items: MenuItem[] }) {
  const location = useLocation();

  const hasSubItems = (item: MenuItem): item is MenuItemWithSub => {
    return (
      'items' in item && Array.isArray(item.items) && item.items.length > 0
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = hasSubItems(item)
            ? item.items.some((sub) => sub.url === location.pathname)
            : location.pathname === item.url ||
              location.pathname.startsWith(item.url + '/');

          return (
            <SidebarMenuItem key={item.title}>
              {hasSubItems(item) ? (
                <Collapsible
                  defaultOpen={isActive}
                  className="group/collapsible"
                  render={
                    <div>
                      <CollapsibleTrigger
                        render={
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={isActive}
                            className="cursor-pointer"
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        }
                      ></CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                isActive={location.pathname === subItem.url}
                                render={
                                  <BlockedLink to={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </BlockedLink>
                                }
                              ></SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </div>
                  }
                ></Collapsible>
              ) : (
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  render={
                    <BlockedLink
                      to={item.url}
                      className="flex items-center gap-2"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </BlockedLink>
                  }
                ></SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
