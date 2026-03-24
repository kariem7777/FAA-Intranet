import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../config/authConfig";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../slices/authSlice";
import type { RootState, AppDispatch } from "../../../store";

/**
 * Custom hook to handle Azure AD authentication
 */
export const useAzureAuth = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading: isBackendLoading, error } = useSelector((state: RootState) => state.auth);

    const isAuthenticated = accounts.length > 0;
    const currentAccount = accounts[0] || null;


    useEffect(() => {
        if (
            inProgress === InteractionStatus.None &&
            isAuthenticated &&
            !user &&
            !isBackendLoading &&
            !error
        ) {
            dispatch(authenticateUser());
        }
    }, [inProgress, isAuthenticated, user, isBackendLoading, error, dispatch]);


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
            return response.accessToken;
        } catch (error) {
            await instance.acquireTokenRedirect(request);
            return null;
        }
    };

    return {
        isAuthenticated,
        currentAccount,
        user,
        role: user?.roles?.[0],
        login,
        logout,
        getAccessToken,
        isLoggingIn: isLoggingIn || inProgress === InteractionStatus.HandleRedirect || (isAuthenticated && isBackendLoading),
        isLoggingOut,
        error
    };
};
