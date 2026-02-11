import { Toaster } from 'react-hot-toast';
import type React from 'react';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
                gutter={12}
                toastOptions={{
                    // Default options
                    duration: 4000,
                    style: {
                        background: 'var(--color-legislation-header-gradient)',
                        color: 'var(--color-bg-white)',
                        border: '1px solid var(--color-text-secondary)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        padding: '12px 16px',
                    },
                    // Default options for specific types
                    success: {
                        duration: 4000,
                        style: {
                            background: 'var(--color-legislation-header-gradient)',
                            color: 'var(--color-bg-white)',
                            border: '1px solid #10B981',
                            borderRadius: '0.5rem',
                        },
                        iconTheme: {
                            primary: '#10B981',
                            secondary: 'var(--color-bg-white)',
                        },
                    },
                    error: {
                        duration: 4000,
                        style: {
                            background: 'var(--color-legislation-header-gradient)',
                            color: 'var(--color-bg-white)',
                            border: '1px solid var(--color-accent-red)',
                            borderRadius: '0.5rem',
                        },
                        iconTheme: {
                            primary: 'var(--color-accent-red)',
                            secondary: 'var(--color-bg-white)',
                        },
                    },
                    loading: {
                        duration: Infinity,
                        style: {
                            background: 'var(--color-legislation-header-gradient)',
                            color: 'var(--color-bg-white)',
                            border: '1px solid var(--color-faa-primary)',
                            borderRadius: '0.5rem',
                        },
                        iconTheme: {
                            primary: 'var(--color-faa-primary)',
                            secondary: 'var(--color-bg-white)',
                        },
                    },
                }}
            />
            {children}
        </>
    );
};

export default ToastProvider;
