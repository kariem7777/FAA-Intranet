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
    // Process auth code from popup/redirect — in a popup this closes the window
    await msalInstance.handleRedirectPromise();
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
