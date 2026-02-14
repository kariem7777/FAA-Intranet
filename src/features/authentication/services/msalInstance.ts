import { PublicClientApplication, EventType } from "@azure/msal-browser";
import type { EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "../config/authConfig";

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 */
export const msalInstance = new PublicClientApplication(msalConfig);

// Logic to set active account on page load pushed to main.jsx after initialization

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event: EventMessage) => {
    if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
            event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
        event.payload
    ) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance.setActiveAccount(account);

        console.log(`✅ [Global Callback] ${event.eventType === EventType.LOGIN_SUCCESS ? 'Login' : 'Token Acquisition'} Successful!`);
        console.log("🔑 [Global Callback] ID Token:", payload.idToken);
        console.log("🔑 [Global Callback] Access Token:", payload.accessToken);
    }
});
