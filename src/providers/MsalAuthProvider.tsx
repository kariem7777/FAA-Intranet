import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/features/authentication';
import { useEffect, useState } from 'react';

interface MsalAuthProviderProps {
    children: React.ReactNode;
}

export const MsalAuthProvider = ({ children }: MsalAuthProviderProps) => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Initialize MSAL instance
        msalInstance.initialize().then(() => {
            setIsInitialized(true);
        });
    }, []);

    // Show nothing until MSAL is initialized
    if (!isInitialized) {
        return null;
    }

    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
