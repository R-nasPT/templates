export type UserRole = 'disabled' | 'user' | 'sku' | 'partner' | 'admin';

export type ApiRoles =
  | 'none'
  | 'shop'
  | 'shopOwner'
  | 'changeAccount'
  | 'representative'
  | 'account'
  | 'sku'
  | 'warehouse'
  | 'admin'
  | 'children'
  | 'advice'
  | 'note';

export interface User {
  id: string;
  name: string;
  email: string;
  contactNumber: number;
  role: UserRole;
  active: boolean;
  propertiesJson: string;
}

export interface UserDetail {
  id?: string;
  name?: string;
  email?: string;
  contactNumber?: string;
  role?: string;
  active?: boolean;
  properties?: {};
  propertiesJson?: string;
}
