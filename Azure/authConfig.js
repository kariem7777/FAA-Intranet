
import { LogLevel } from "@azure/msal-browser";


export const msalConfig = {
    auth: {
        clientId: "1ca490eb-6d48-4739-a1c6-cf07b23ac1d9",
        authority: "https://login.microsoftonline.com/4ee3ed2b-604f-4f5a-893e-392078505d31",
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};


export const loginRequest = {
    scopes: ["api://1ca490eb-6d48-4739-a1c6-cf07b23ac1d9/access_as_user"]
};


export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
