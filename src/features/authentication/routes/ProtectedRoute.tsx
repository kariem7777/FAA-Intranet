import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Loader2, ShieldX } from 'lucide-react';

interface ProtectedRouteProps {
    /** Roles allowed to access this route (case-insensitive). If omitted, any authenticated user is allowed. */
    allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);

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
                <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
                <p className="text-gray-500 max-w-md">
                    You don't have permission to view this page. Please contact your administrator
                    if you believe this is a mistake.
                </p>
            </div>
        );
    }

    // If allowed roles are specified, check the user has at least one of them
    if (allowedRoles && allowedRoles.length > 0) {
        const userRoles = (user?.roles ?? []).map(r => r.toLowerCase());
        const hasAccess = allowedRoles.some(r => userRoles.includes(r.toLowerCase()));

        if (!hasAccess) {
            return (
                <div className="h-[70vh]! flex flex-col items-center justify-center gap-4 text-center px-4">
                    <ShieldX className="h-16 w-16 text-red-400" />
                    <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
                    <p className="text-gray-500 max-w-md">
                        You don't have permission to view this page. Please contact your administrator
                        if you believe this is a mistake
                    </p>
                </div>
            );
        }
    }

    return <Outlet />;
}
