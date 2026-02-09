import { LogIn, LogOut, Loader2 } from 'lucide-react';
import { useAzureAuth } from '../hooks/useAzureAuth';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

interface AzureLoginButtonProps {
    className?: string;
    showUserInfo?: boolean;
}

export const AzureLoginButton = ({ className = '', showUserInfo = false }: AzureLoginButtonProps) => {
    const { login, logout, isLoggingIn, isLoggingOut, currentAccount } = useAzureAuth();

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <UnauthenticatedTemplate>
                <button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className={`p-2 rounded-lg hover:bg-white/10 transition-all relative flex items-center gap-2 ${className}`}
                    title="Sign in with Azure AD"
                >
                    {isLoggingIn ? (
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                    ) : (
                        <LogIn className="h-6 w-6 text-white" />
                    )}
                </button>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
                <div className="flex items-center gap-2">
                    {showUserInfo && currentAccount && (
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-white text-sm font-medium">{currentAccount.name}</span>
                            <span className="text-white/60 text-xs">{currentAccount.username}</span>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className={`p-2 rounded-lg hover:bg-white/10 transition-all relative ${className}`}
                        title="Sign out"
                    >
                        {isLoggingOut ? (
                            <Loader2 className="h-6 w-6 text-white animate-spin" />
                        ) : (
                            <LogOut className="h-6 w-6 text-white" />
                        )}
                    </button>
                </div>
            </AuthenticatedTemplate>
        </>
    );
};
