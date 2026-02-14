import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/features/authentication';

interface MsalAuthProviderProps {
    children: React.ReactNode;
}

/**
 * MsalAuthProvider wraps the app with MsalProvider.
 * MSAL initialization and handleRedirectPromise() are done in main.jsx
 * BEFORE this component renders, so no need to re-initialize here.
 */
export const MsalAuthProvider = ({ children }: MsalAuthProviderProps) => {
    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
