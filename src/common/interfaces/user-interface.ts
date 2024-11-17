export interface User {
  id?: string;
  email: string;
  passwordHash: string;
  name: string;
  roleId: string;
  isActive: boolean;
  lastLoginAt?: Date;
  refreshTokenHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
