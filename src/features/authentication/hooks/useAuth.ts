import { useAppSelector } from '@/store/hooks';
import { ROLES, type RoleType } from '../constants/roles';

export const useAuth = () => {
    const { user, isLoading } = useAppSelector((state) => state.auth);

    const hasRole = (roles: string | string[] | RoleType) => {
        if (!user || !user.roles) return false;
        const requiredRoles = (Array.isArray(roles) ? roles : [roles]).map(r => String(r).toLowerCase());
        const userRoles = user.roles.map(r => String(r).toLowerCase());
        return requiredRoles.some(r => userRoles.includes(r));
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user?.isAuthenticated,
        isAdmin: hasRole(ROLES.Legal_Admin),
        isDeptDirector: hasRole(ROLES.Legal_Dept_Director),
        isUser: hasRole(ROLES.Legal_User),
        isSecertUser: hasRole(ROLES.Legal_User_Secert),
        isSuperAdmin: hasRole(ROLES.Legal_Super_Admin),
        hasRole,
    };
};
