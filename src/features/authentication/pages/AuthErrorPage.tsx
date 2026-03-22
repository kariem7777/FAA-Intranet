import { ShieldAlert, RefreshCw, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { authenticateUser, resetError } from '../slices/authSlice';
import type { RootState, AppDispatch } from '../../../store';
import { useTranslation } from '@/shared/hooks/useTranslation';

export function AuthErrorPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { instance, accounts } = useMsal();
    const { t, direction } = useTranslation();
    const { error } = useSelector((state: RootState) => state.auth);
    const account = accounts[0];

    const handleRetry = () => {
        dispatch(resetError());
        dispatch(authenticateUser());
    };

    const handleSignOut = async () => {
        try {
            await instance.logoutRedirect();
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <div 
            dir={direction}
            className="min-h-screen flex items-center justify-center px-4" 
            style={{ 
                background: 'var(--color-legislation-header-gradient)',
                fontFamily: direction === 'rtl' ? 'var(--font-family-arabic)' : 'var(--font-family-english)'
            }}
        >
            {/* Background decorative blobs */}
            <div style={{ position: 'absolute', top: '20%', left: '15%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div
                style={{
                    position: 'relative',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 24,
                    padding: '56px 48px',
                    maxWidth: 480,
                    width: '100%',
                    textAlign: 'center',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                }}
            >
                {/* Icon */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'rgba(231,0,11,0.1)',
                    border: '1px solid rgba(231,0,11,0.2)',
                    marginBottom: 28,
                }}>
                    <ShieldAlert style={{ width: 36, height: 36, color: 'var(--color-accent-red)' }} />
                </div>

                {/* Title */}
                <h1 style={{ fontSize: 26, fontWeight: 700, color: '#ffffff', marginBottom: 16, lineHeight: 1.3 }}>
                    {t('auth.authFailedTitle')}
                </h1>

                {/* Subtitle */}
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: 8 }}>
                    {error || t('auth.authFailedSubtitle')}
                </p>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: 32 }}>
                    {t('auth.contactAdmin')}
                </p>

                {/* Account chip */}
                {account && (
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 999,
                        padding: '6px 16px',
                        marginBottom: 32,
                    }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent-red)' }} />
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{account.username}</span>
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleRetry}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '12px 28px',
                            borderRadius: 12,
                            background: 'var(--color-button-gradient)',
                            border: 'none',
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <RefreshCw style={{ width: 16, height: 16 }} />
                        {t('auth.tryAgain')}
                    </button>

                    <button
                        onClick={handleSignOut}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '12px 28px',
                            borderRadius: 12,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#ffffff',
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    >
                        <LogOut style={{ width: 16, height: 16 }} />
                        {t('auth.signOut')}
                    </button>
                </div>
            </div>
        </div>
    );
}

