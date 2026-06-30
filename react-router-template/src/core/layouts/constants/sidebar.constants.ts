import type { ApiRoles } from '@/shared/types';
import type { LucideIcon } from 'lucide-react';
import { Building2, CircleUser } from 'lucide-react';

export type SidebarMenuItemConfig = {
  title: string;
  url: string;
  icon: LucideIcon;
  /** If set, item is only shown when the user has at least one of these roles. */
  requiredRoles?: ApiRoles[];
};

const SIDEBAR_MENU: SidebarMenuItemConfig[] = [
  {
    title: 'Demo',
    url: '/demo',
    icon: CircleUser,
  },
  {
    title: 'test',
    url: '/test',
    icon: Building2,
    // Visible to Global Admin ('admin') and Tenant Admin ('warehouse')
    requiredRoles: ['admin', 'warehouse'],
  },
];

export default SIDEBAR_MENU;
