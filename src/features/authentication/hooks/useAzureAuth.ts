import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../slices/authSlice";
import type { RootState, AppDispatch } from "../../../store";

/**
 * Custom hook to handle Azure AD authentication
 */
export const useAzureAuth = () => {
    const { instance, accounts } = useMsal();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading: isBackendLoading, error } = useSelector((state: RootState) => state.auth);

    const isAuthenticated = accounts.length > 0;
    const currentAccount = accounts[0] || null;

    useEffect(() => {
        if (isAuthenticated && !user && !isBackendLoading && !error) {
            dispatch(authenticateUser());
        }
    }, [isAuthenticated, user, isBackendLoading, error, dispatch]);


    /**
     * Login using redirect to avoid popup blockers and nested app issues
     */
    const login = async () => {
        setIsLoggingIn(true);
        try {
            await instance.loginRedirect(loginRequest);
            // Note: The code below won't execute because the page will redirect
        } catch (error) {
            console.error("❌ Login error:", error);
            setIsLoggingIn(false); // Only reset if login fails immediately (e.g. invalid config)
            throw error;
        }
    };

    /**
     * Logout using redirect
     */
    const logout = async () => {
        setIsLoggingOut(true);
        try {
            await instance.logoutRedirect();
            // Page redirects
        } catch (error) {
            console.error("❌ Logout error:", error);
            setIsLoggingOut(false);
            throw error;
        }
    };

    /**
     * Get access token silently or via redirect
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
            console.log("✅ Token acquired silently!");
            return response.accessToken;
        } catch (error) {
            console.log("⚠️ Silent token acquisition failed, redirecting to acquire token...");
            // Use redirect instead of popup
            await instance.acquireTokenRedirect(request);
            // This will not return a token here, but will redirect the user.
            // The token will be available after redirect in handleRedirectPromise()
            return null;
        }
    };

    return {
        isAuthenticated,
        currentAccount,
        user,
        role: user?.role,
        login,
        logout,
        getAccessToken,
        isLoggingIn: isLoggingIn || (isAuthenticated && isBackendLoading),
        isLoggingOut,
        error
    };
};
