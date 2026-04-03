import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/features/authentication';

interface MsalAuthProviderProps {
    children: React.ReactNode;
}

/**
 * MsalAuthProvider wraps the app with MsalProvider.
 * MSAL initialization and redirect handling are coordinated by AuthGate.
 * This provider only supplies the shared MSAL instance to React.
 */
export const MsalAuthProvider = ({ children }: MsalAuthProviderProps) => {
    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
