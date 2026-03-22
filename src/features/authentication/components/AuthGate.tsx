import { type ReactNode } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { useSelector } from 'react-redux';
import { Loader2, Lock } from 'lucide-react';
import type { RootState } from '../../../store';
import { AzureLoginButton } from './AzureLoginButton';
import { AuthErrorPage } from '../pages/AuthErrorPage';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface AuthGateProps {
    children: ReactNode;
}

/**
 * AuthGate — blocks the entire app until:
 *  1. The user is authenticated via Azure AD (MSAL)
 *  2. The backend /auth API call succeeds and the user record exists in Redux
 *
 * States:
 *  - MSAL redirect in progress → full-screen spinner
 *  - Not logged in           → branded login splash
 *  - Backend loading         → full-screen spinner
 *  - Backend error           → AuthErrorPage ("contact administrator")
 *  - All good                → renders children
 */
export function AuthGate({ children }: AuthGateProps) {
    const { accounts, inProgress } = useMsal();
    const { user, isLoading: isBackendLoading, error } = useSelector((state: RootState) => state.auth);
    const { t } = useTranslation();

    const isAuthenticated = accounts.length > 0;
    const isMsalBusy = inProgress !== InteractionStatus.None;
    if (isMsalBusy) {
        return <FullScreenSpinner label={t('auth.verifyingIdentity')} />;
    }
    if (!isAuthenticated) {
        return <LoginSplash />;
    }
    if (isBackendLoading && !user) {
        return <FullScreenSpinner label={t('auth.verifyingIdentity')} />;
    }
    if (error && !user) {
        return <AuthErrorPage />;
    }
    if (user && !user.isAuthenticated) {
        return <AuthErrorPage />;
    }
    return <>{children}</>;
}


function FullScreenSpinner({ label }: { label?: string }) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-legislation-header-gradient)',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <Loader2 style={{ width: 44, height: 44, color: 'var(--color-legislation-active-indicator)', animation: 'spin 1s linear infinite' }} />
                {label && <p style={{ color: 'var(--color-legislation-active-indicator)', fontSize: 14 }}>{label}</p>}
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

function LoginSplash() {
    const { t, direction } = useTranslation();

    return (
        <div
            dir={direction}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                background: 'var(--color-legislation-header-gradient)',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: direction === 'rtl' ? 'var(--font-family-arabic)' : 'var(--font-family-english)'
            }}
        >
            {/* Background decorative blobs */}
            <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div
                style={{
                    position: 'relative',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 28,
                    padding: '60px 48px',
                    maxWidth: 500,
                    width: '100%',
                    textAlign: 'center',
                    backdropFilter: 'blur(24px)',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
                }}
            >
                {/* Lock icon badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'var(--color-legislation-active-indicator)',
                    marginBottom: 28,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                }}>
                    <Lock style={{ width: 32, height: 32, color: 'var(--color-legislation-header-end)' }} />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <span style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: direction === 'rtl' ? '0' : '0.15em',
                        color: 'var(--color-legislation-active-indicator)',
                        textTransform: 'uppercase',
                        marginBottom: 10,
                    }}>
                        {t('auth.orgName')}
                    </span>
                </div>

                <h1 style={{ fontSize: 32, fontWeight: 700, color: '#ffffff', marginBottom: 16, lineHeight: 1.2 }}>
                    {t('auth.loginTitle')}
                </h1>

                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: 40 }}>
                    {t('auth.loginSubtitle')}
                </p>

                {/* Divider line */}
                <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 32 }} />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LoginCTA />
                </div>

                <p style={{ marginTop: 32, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                    {direction === 'rtl' ? 'مدعوم من' : 'Powered by'} Microsoft Azure AD
                </p>
            </div>
        </div>
    );
}

function LoginCTA() {
    return (
        <AzureLoginButton
            className="!px-10 !py-4 !rounded-xl !text-lg !font-semibold !gap-4 shadow-xl hover:scale-[1.02] transition-transform"
            showLoginText
        />
    );
}
