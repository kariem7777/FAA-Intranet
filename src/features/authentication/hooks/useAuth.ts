import { useAppSelector } from '@/store/hooks';
import { ROLES } from '../constants/roles';

export const useAuth = () => {
    const { user, isLoading } = useAppSelector((state) => state.auth);

    const hasRole = (roles: string | string[]) => {
        if (!user || !user.roles) return false;
        const requiredRoles = Array.isArray(roles) ? roles : [roles];
        const userRoles = user.roles.map(r => r.toLowerCase());
        return requiredRoles.some(r => userRoles.includes(r.toLowerCase()));
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user?.isAuthenticated,
        isAdmin: hasRole(ROLES.ADMIN),
        isManager: hasRole(ROLES.MANAGER),
        isUser: hasRole(ROLES.USER),
        hasRole,
    };
};
