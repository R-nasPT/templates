import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './Sidebar';
import template from '@/assets/template_logo.png';

export function SidebarBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent hover:text-inherit active:bg-transparent dark:hover:bg-transparent dark:active:bg-transparent"
          render={
            <div>
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg">
                <img src={template} alt="Thaicloud Logo" className="size-9" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-gray-900 dark:text-gray-100">
                  Thaicloud
                </span>
                <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                  Fulfillment Platform
                </span>
              </div>
            </div>
          }
        ></SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
