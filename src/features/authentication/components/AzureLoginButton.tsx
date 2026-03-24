import { LogIn, LogOut, Loader2, ChevronDown, Shield, Mail, UserPlus } from 'lucide-react';
import { useAzureAuth } from '../hooks/useAzureAuth';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar } from './UserAvatar';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AzureLoginButtonProps {
    className?: string;
    showLoginText?: boolean;
    variant?: 'desktop' | 'mobile-drawer';
}

export const AzureLoginButton = ({
    className = '',
    showLoginText = false,
    variant = 'desktop'
}: AzureLoginButtonProps) => {
    const { login, logout, isLoggingIn, isLoggingOut, currentAccount, role } = useAzureAuth();
    const { direction, t } = useTranslation();
    const { isSuperAdmin } = useAuth();

    const isAddUserPage = window.location.href === '/add-user';

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
                    className="flex items-center gap-2 group transition-all duration-300"
                >
                    <div className="relative">
                        <UserAvatar
                            name={currentAccount?.name}
                            size="sm"
                            className={`ring-2 ring-white/20 group-hover:ring-white/50 transition-all ${open ? 'ring-white/80 scale-105' : ''}`}
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#908e81] rounded-full" />
                    </div>
                    <div className="hidden md:flex flex-col items-start min-w-[80px]">
                        <span className="text-sm font-bold text-white leading-none truncate max-w-[120px]">
                            {currentAccount?.name?.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-white/60 font-medium">
                            {role?.replace(/_/g, ' ') || 'User'}
                        </span>
                    </div>
                    <ChevronDown
                        className={`h-4 w-4 text-white/70 transition-transform duration-300 ${open ? "rotate-180 text-white" : "group-hover:text-white"}`}
                    />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute mt-3 w-72 rounded-2xl shadow-2xl z-50 overflow-hidden"
                            style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                [isRTL ? "left" : "right"]: 0
                            }}
                        >
                            {/* User Profile Header */}
                            <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <UserAvatar name={currentAccount?.name} size="md" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-bold text-gray-900 text-base! leading-tight truncate">
                                            {currentAccount?.name}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs! text-gray-500 mt-0.5">
                                            <Mail size={12} className="shrink-0" />
                                            <span className="truncate">{currentAccount?.username}</span>
                                        </div>
                                    </div>
                                </div>
                                {role && (
                                    <div className="mt-4! flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-xl w-fit shadow-sm">
                                        <Shield size={14} className="text-[#908e81]" />
                                        <span className="text-xs! font-bold! text-gray-700">
                                            {role?.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Menu Items */}
                            <div className="p-2">
                                {isSuperAdmin && (
                                    <Link
                                        to="/add-user"
                                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm! font-semibold! rounded-xl transition-all group ${isAddUserPage
                                            ? 'bg-[color:var(--color-faa-primary)] text-white shadow-md'
                                            : 'hover:bg-[color:var(--color-faa-primary)]/20 text-gray-700'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-lg flex items-center justify-center transition-colors ${isAddUserPage
                                            ? 'bg-white/20'
                                            : 'bg-red-50 group-hover:bg-faa-primary/20'}`}>
                                            <UserPlus className={`h-4 w-4 ${isAddUserPage ? 'text-white' : ''}`} />
                                        </div>
                                        <span>{t('legislation.hero.addUserTitle') || 'Add User'}</span>
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm! font-semibold! rounded-xl transition-all group"
                                    style={{
                                        color: "#ef4444"
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                    <div className="w-4 h-4 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                        {isLoggingOut ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <LogOut className="h-4 w-4" />
                                        )}
                                    </div>
                                    <span>{t('auth.signOut') || 'Sign out'}</span>
                                </button>

                            </div>

                            {/* Footer / Info */}
                            <div className="px-5! py-3! bg-gray-50 border-t border-gray-100 italic">
                                <p className="text-[10px]! text-gray-400 text-center">
                                    Financial Audit Authority &copy; {new Date().getFullYear()}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    function MobileUserView() {
        return (
            <div className="flex flex-col gap-4">
                {/* User Info Card */}
                <div className="p-5 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <UserAvatar name={currentAccount?.name} size="md" className="ring-2 ring-white/20" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-[#908e81] rounded-full" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-white font-bold text-lg leading-tight truncate">
                                {currentAccount?.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-white/50 text-xs truncate mt-0.5">
                                <Mail size={12} className="shrink-0" />
                                <span className="truncate">{currentAccount?.username}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 bg-white/10 border border-white/10 rounded-lg w-fit">
                                <Shield size={10} className="text-white/70" />
                                <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
                                    {role?.replace(/_/g, ' ') || 'User'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                {isSuperAdmin && (
                    <Link
                        to="/add-user"
                        className="flex items-center justify-center gap-3 py-4 rounded-[2rem] bg-[color:var(--color-faa-primary)]/10 hover:bg-[color:var(--color-faa-primary)]/20 text-white font-bold w-full transition-all border border-[color:var(--color-faa-primary)] active:scale-[0.98] shadow-lg"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span>{t('legislation.hero.addUserTitle') || 'Add User'}</span>
                    </Link>
                )}
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center gap-3 py-4 rounded-[2rem] bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold w-full transition-all border border-red-500/20 active:scale-[0.98] shadow-lg"
                >
                    {isLoggingOut ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <LogOut className="h-5 w-5" />
                    )}
                    <span>{t('auth.signOut') || 'Sign out'}</span>
                </button>
            </div>
        );
    }

    return (
        <div className={className}>
            <UnauthenticatedTemplate>
                <button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="group relative flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 overflow-hidden"
                    style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        width: "100%"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")}
                >
                    {isLoggingIn ? (
                        <Loader2 className="h-5 w-5 text-white animate-spin" />
                    ) : (
                        <LogIn className="h-5 w-5 text-white group-hover:translate-x-0.5 transition-transform" />
                    )}
                    <span className="text-white font-bold text-sm">
                        {isLoggingIn ? t('auth.signingIn') : (showLoginText ? t('auth.signInWithMicrosoft') : 'Login')}
                    </span>
                </button>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
                {variant === 'desktop' ? (
                    <UserMenu dir={direction} />
                ) : (
                    <MobileUserView />
                )}
            </AuthenticatedTemplate>
        </div>
    );
};
