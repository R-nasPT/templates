import { cn } from '@/shared/lib';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './Sidebar';
import template from '@/assets/template_logo.png';

export function SidebarBrand() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className={cn(
            'cursor-default hover:bg-transparent active:bg-transparent',
            isCollapsed && 'justify-center'
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg">
            <img src={template} alt="Project Template Logo" className="size-8" />
          </div>
          {!isCollapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate uppercase font-medium text-sidebar-foreground">
                Project Template
              </span>
              <span className="truncate text-xs text-sidebar-foreground/60">
                Start · Build · Ship
              </span>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
