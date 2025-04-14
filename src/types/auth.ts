
export type UserRole = 'producer' | 'reseller' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  parentId?: string; // ID of the reseller for customers, or producer for resellers
}
