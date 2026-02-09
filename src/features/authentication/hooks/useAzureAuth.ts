import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { useState } from "react";

/**
 * Custom hook to handle Azure AD authentication
 */
export const useAzureAuth = () => {
    const { instance, accounts } = useMsal();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const isAuthenticated = accounts.length > 0;
    const currentAccount = accounts[0] || null;

    /**
     * Login using popup
     */
    const login = async () => {
        setIsLoggingIn(true);
        try {
            const response = await instance.loginPopup(loginRequest);
            console.log("✅ Login successful!", response);

            if (response.idToken) {
                console.log("🔑 ID Token:", response.idToken);
            }
            if (response.accessToken) {
                console.log("🔑 Access Token:", response.accessToken);
            }

            return response;
        } catch (error) {
            console.error("❌ Login error:", error);
            throw error;
        } finally {
            setIsLoggingIn(false);
        }
    };

    /**
     * Logout using popup
     */
    const logout = async () => {
        setIsLoggingOut(true);
        try {
            await instance.logoutPopup();
            console.log("✅ Logout successful!");
        } catch (error) {
            console.error("❌ Logout error:", error);
            throw error;
        } finally {
            setIsLoggingOut(false);
        }
    };

    /**
     * Get access token silently or via popup
     */
    const getAccessToken = async () => {
        if (!currentAccount) {
            throw new Error("No active account! Please login first.");
        }

        const request = {
            ...loginRequest,
            account: currentAccount,
        };

        try {
            const response = await instance.acquireTokenSilent(request);
            console.log("✅ Token acquired silently!", response.accessToken);
            return response.accessToken;
        } catch (error) {
            console.log("⚠️ Silent token acquisition failed, trying popup...");
            const response = await instance.acquireTokenPopup(request);
            console.log("✅ Token acquired via popup!", response.accessToken);
            return response.accessToken;
        }
    };

    return {
        isAuthenticated,
        currentAccount,
        login,
        logout,
        getAccessToken,
        isLoggingIn,
        isLoggingOut,
    };
};
