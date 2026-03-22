import { createRoot } from 'react-dom/client'
import { ReduxProvider, ToastProvider, DialogPortalProvider, MsalAuthProvider } from './providers'
import './i18n';
import AppRouter from './AppRouter';
import { msalInstance, AuthGate } from './features/authentication';
import "quill/dist/quill.snow.css";
import './index.css'

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

    if (response?.account) {
      msalInstance.setActiveAccount(response.account);
      console.log("✅ [Auth] Redirect login successful!");
      console.log("🔑 [Auth] ID Token:", response.idToken);
      console.log("🔑 [Auth] Access Token:", response.accessToken);
    }
  } catch (error) {
    console.error('MSAL initialization error:', error);
  }

  createRoot(document.getElementById('root')).render(
    <MsalAuthProvider>
      <ReduxProvider>
        <AuthGate>
          <DialogPortalProvider>
            <ToastProvider>
              <AppRouter />
            </ToastProvider>
          </DialogPortalProvider>
        </AuthGate>
      </ReduxProvider>
    </MsalAuthProvider>,
  );
}

startApp();
