import { LogIn, LogOut, Loader2, ChevronDown, User } from 'lucide-react';
import { useAzureAuth } from '../hooks/useAzureAuth';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface AzureLoginButtonProps {
    className?: string;
    showLoginText?: boolean;
}

export const AzureLoginButton = ({
    className = '',
    showLoginText = false
}: AzureLoginButtonProps) => {
    const { login, logout, isLoggingIn, isLoggingOut, currentAccount } = useAzureAuth();
    const { direction, t } = useTranslation();
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

    function UserMenu({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
        const [open, setOpen] = useState(false);
        const menuRef = useRef<HTMLDivElement>(null);

        const isRTL = dir === "rtl";

        // Close when clicking outside
        useEffect(() => {
            function handleClickOutside(e: MouseEvent) {
                if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                    setOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div className="relative" ref={menuRef} dir={dir}>

                {/* Trigger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                    style={{
                        background: "transparent",
                        color: "var(--color-bg-white)"
                    }}
                >
                    <User className="h-6 w-6" />
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                </button>

                {/* Dropdown */}
                {open && (
                    <div
                        className={`absolute mt-2 w-56 rounded-xl shadow-lg z-50`}
                        style={{
                            background: "var(--color-bg-white)",
                            border: "1px solid var(--color-bg-light)",
                            [isRTL ? "left" : "right"]: 0
                        }}
                    >
                        {/* User Info */}
                        {currentAccount && (
                            <div
                                className="px-4 py-3 border-b"
                                style={{ borderColor: "var(--color-bg-light)" }}
                            >
                                <p
                                    className="font-medium"
                                    style={{ color: "var(--color-document-main-primary)" }}
                                >
                                    {currentAccount.name}
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--color-secondary)" }}
                                >
                                    {currentAccount.username}
                                </p>
                            </div>
                        )}

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm transition"
                            style={{
                                color: "var(--color-accent-red)"
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                                "var(--color-bg-red-light)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "transparent")
                            }
                        >
                            {isLoggingOut ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <LogOut className="h-4 w-4" />
                            )}
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        );
    }
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
                    {showLoginText && (
                        <span className="text-white font-medium">
                            {isLoggingIn ? t('auth.signingIn') : t('auth.signInWithMicrosoft')}
                        </span>
                    )}
                </button>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
                <UserMenu dir={direction} />
            </AuthenticatedTemplate>
        </>
    );
};
