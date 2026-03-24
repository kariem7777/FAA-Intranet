export const ROLES = {
    Legal_Admin: 'Legal_Admin',
    Legal_Dept_Director: 'Legal_Dept_Director',
    Legal_Super_Admin: 'Legal_Super_Admin',
    Legal_User: 'Legal_User',
    Legal_User_Secert: 'Legal_User_Secert'
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];
