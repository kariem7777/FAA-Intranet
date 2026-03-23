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

// MSAL initialization is now handled within the AuthGate component 
// to avoid blocking the initial render and showing a white screen.

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
