import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2, ShieldX } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface ProtectedRouteProps {
    /** Roles allowed to access this route (case-insensitive). If omitted, any authenticated user is allowed. */
    allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { user, isLoading, hasRole } = useAuth();
    const { t } = useTranslation();

    // Still fetching backend user info or not authenticated by backend
    if (isLoading || !user || !user.isAuthenticated) {
        if (isLoading) {
            return (
                <div className="h-[70vh] flex items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
                </div>
            );
        }

        return (
            <div className="h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
                <ShieldX className="h-16 w-16 text-red-400" />
                <h1 className="text-2xl font-bold text-gray-800">{t('auth.protectedRoute.accessDenied')}</h1>
                <p className="text-gray-500 max-w-md">
                    {t('auth.protectedRoute.noPermission')}
                </p>
            </div>
        );
    }

    // If allowed roles are specified, check the user has at least one of them
    if (allowedRoles && allowedRoles.length > 0) {
        const hasAccess = hasRole(allowedRoles);

        if (!hasAccess) {
            return (
                <div className="h-[70vh]! flex flex-col items-center justify-center gap-4 text-center px-4">
                    <ShieldX className="h-16 w-16 text-red-400" />
                    <h1 className="text-2xl font-bold text-gray-800">{t('auth.protectedRoute.accessDenied')}</h1>
                    <p className="text-gray-500 max-w-md">
                        {t('auth.protectedRoute.noPermission')}
                    </p>
                </div>
            );
        }
    }

    return <Outlet />;
}
