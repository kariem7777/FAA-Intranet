import { createRoot } from 'react-dom/client'
import './index.css'
import { ReduxProvider, ToastProvider, DialogPortalProvider, MsalAuthProvider } from './providers'
import './i18n';
import AppRouter from './AppRouter';
import { msalInstance } from './features/authentication';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

/**
 * Initialize MSAL BEFORE rendering the app.
 * This is critical for popup login flow:
 * - The popup window redirects back with ?code= in the URL
 * - handleRedirectPromise() processes the code and closes the popup
 * - Without this, the popup loads the full app and never closes
 */
async function startApp() {
  try {
    await msalInstance.initialize();

    // Process auth code from popup/redirect
    const response = await msalInstance.handleRedirectPromise();

    if (response) {
      console.log("✅ [Auth] Redirect login successful!");
      console.log("🔑 [Auth] ID Token:", response.idToken);
      console.log("🔑 [Auth] Access Token:", response.accessToken);
    }

    // Set active account on page load if user is already signed in
    if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
      msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    }
  } catch (error) {
    console.error('MSAL initialization error:', error);
  }

  createRoot(document.getElementById('root')).render(
    <MsalAuthProvider>
      <ReduxProvider>
        <DialogPortalProvider>
          <ToastProvider>
            <AppRouter />
          </ToastProvider>
        </DialogPortalProvider>
      </ReduxProvider>
    </MsalAuthProvider>,
  );
}

startApp();
