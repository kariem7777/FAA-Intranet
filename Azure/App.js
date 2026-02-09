import React, { useState, useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import "./App.css";

function App() {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      console.log("✅ User logged in successfully!");
      console.log("User Account:", accounts[0]);
    }
  }, [accounts]);

  const handleLogin = () => {
    instance.loginPopup(loginRequest)
      .then((response) => {
        console.log("✅ Login successful!");
        console.log("Login Response:", response);
        if (response.idToken) {
          console.log("🔑 ID Token:", response.idToken);
          setIdToken(response.idToken);
        }
        if (response.accessToken) {
          console.log("🔑 Access Token:", response.accessToken);
          setAccessToken(response.accessToken);
        }
      })
      .catch((e) => {
        console.error("❌ Login error:", e);
      });
  };

  const handleGetToken = () => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        console.log("✅ Token acquired successfully!");
        console.log("Token Response:", response);
        if (response.accessToken) {
          console.log("🔑 Access Token:", response.accessToken);
          setAccessToken(response.accessToken);
        }
        if (response.idToken) {
          console.log("🔑 ID Token:", response.idToken);
          setIdToken(response.idToken);
        }
      })
      .catch((e) => {
        console.log("⚠️ Silent token acquisition failed, trying popup...");
        instance.acquireTokenPopup(request).then((response) => {
          console.log("✅ Token acquired via popup!");
          console.log("Token Response:", response);
          if (response.accessToken) {
            console.log("🔑 Access Token:", response.accessToken);
            setAccessToken(response.accessToken);
          }
          if (response.idToken) {
            console.log("🔑 ID Token:", response.idToken);
            setIdToken(response.idToken);
          }
        });
      });
  };

  const handleLogout = () => {
    console.log("👋 Logging out...");
    instance.logoutPopup()
      .then(() => {
        console.log("✅ Logout successful!");
        setAccessToken(null);
        setIdToken(null);
      })
      .catch((e) => {
        console.error("❌ Logout error:", e);
      });
  };

  return (
    <div className="App">
      <div className="card">
        <h1>Azure AD Loggin Test</h1>
        <p className="subtitle">Authentication with SSO Azure AD</p>

        <UnauthenticatedTemplate>
          <p>Please sign in to acquire a token.</p>
          <button className="login-btn" onClick={handleLogin}>
            Sign In with Azure AD
          </button>
        </UnauthenticatedTemplate>

        <AuthenticatedTemplate>
          <div style={{ textAlign: "left" }}>
            {/* Logged in success message */}
            <div style={{
              textAlign: 'center',
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #c3e6cb'
            }}>
              <strong>✅ Logged in successfully!</strong>
            </div>

            <p style={{ textAlign: "center" }}>Welcome, <strong>{accounts[0]?.name}</strong>!</p>
            <p style={{ textAlign: "center", fontSize: '0.9rem', color: '#666' }}>
              Email: {accounts[0]?.username}
            </p>

            {!accessToken && !idToken && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>Click below to retrieve your tokens.</p>
                <button className="login-btn" onClick={handleGetToken}>
                  Get Tokens
                </button>
              </div>
            )}

            {accessToken && (
              <div className="token-box" style={{ marginBottom: '15px' }}>
                <span className="token-label">Access Token:</span>
                <div style={{ wordBreak: 'break-all', fontSize: '0.85rem', marginTop: '8px' }}>
                  {accessToken}
                </div>
              </div>
            )}

            {idToken && (
              <div className="token-box" style={{ marginBottom: '15px' }}>
                <span className="token-label">ID Token:</span>
                <div style={{ wordBreak: 'break-all', fontSize: '0.85rem', marginTop: '8px' }}>
                  {idToken}
                </div>
              </div>
            )}

            {(accessToken || idToken) && (
              <p style={{
                textAlign: 'center',
                fontSize: '0.85rem',
                color: '#666',
                fontStyle: 'italic',
                marginTop: '10px'
              }}>
                💡 Check the browser console for detailed token information
              </p>
            )}

            <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <button
                className="login-btn"
                style={{ backgroundColor: '#dc3545', fontSize: '0.9rem', padding: '10px 20px' }}
                onClick={handleLogout}
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        </AuthenticatedTemplate>
      </div>
    </div>
  );
}

export default App;
