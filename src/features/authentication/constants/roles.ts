export const ROLES = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    USER: 'User',
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];
