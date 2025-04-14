
# Azure B2C Integration Guide

This document explains how to properly set up and integrate Azure B2C authentication with the KOVERLAYER portal.

## Prerequisites

1. An Azure account with an active subscription
2. An Azure B2C tenant

## Step 1: Create an Azure B2C Tenant

If you don't already have an Azure B2C tenant:

1. Sign in to the [Azure portal](https://portal.azure.com)
2. Select **Create a resource**
3. Search for **Azure Active Directory B2C**
4. Follow the prompts to create a new tenant

## Step 2: Register your Application

1. In your B2C tenant, navigate to **App registrations**
2. Click **New registration**
3. Enter a name for your application (e.g., "KOVERLAYER Portal")
4. Under **Supported account types**, select **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**
5. Under **Redirect URI**, select **Web** and enter your application's redirect URL (e.g., `http://localhost:8080` for development or your production URL)
6. Click **Register**

## Step 3: Create User Flows

1. In your B2C tenant, navigate to **User flows**
2. Click **New user flow**
3. Create the following user flows:
   - Sign up and sign in
   - Password reset
   - Profile editing

## Step 4: Configure the Application

1. Update the `src/utils/azureB2CConfig.ts` file with your tenant information:

```typescript
export const msalConfig = {
  auth: {
    clientId: "your-client-id", // Application (client) ID from App registration
    authority: "https://yourtenant.b2clogin.com/yourtenant.onmicrosoft.com/your-policy",
    knownAuthorities: ["yourtenant.b2clogin.com"],
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  // ...
};
```

## Step 5: Update AuthContext to Use Azure B2C

Update the `src/contexts/AuthContext.tsx` file to use MSAL for authentication instead of the mock implementation:

```typescript
import { useMsal, MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, AccountInfo, InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "@/utils/azureB2CConfig";

// Initialize MSAL
const msalInstance = new PublicClientApplication(msalConfig);

// Then update the login/logout methods to use MSAL
const login = async () => {
  try {
    const response = await msalInstance.loginPopup(loginRequest);
    // Process the response
    const user = {
      id: response.account.localAccountId,
      name: response.account.name,
      email: response.account.username,
    };
    setUser(user);
    setIsAuthenticated(true);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await msalInstance.logout();
    setUser(null);
    setIsAuthenticated(false);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
```

## Step 6: Wrap Your Application with MsalProvider

In your `App.tsx`, wrap your components with the `MsalProvider`:

```typescript
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/utils/azureB2CConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => (
  <MsalProvider instance={msalInstance}>
    <QueryClientProvider client={queryClient}>
      {/* Rest of your app */}
    </QueryClientProvider>
  </MsalProvider>
);
```

## Additional Configurations

### Handling Language Preferences

You can store the user's language preference in the B2C user attributes:

1. Configure custom attributes in your B2C tenant
2. Update your user flows to collect and display these attributes
3. Retrieve these attributes after authentication and set the application language accordingly

### Securing API Calls

To secure API calls:

1. Acquire tokens with the appropriate scopes
2. Use these tokens in the Authorization header of your requests

```typescript
const acquireToken = async () => {
  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: msalInstance.getAllAccounts()[0]
    });
    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      return msalInstance.acquireTokenPopup(loginRequest).then(response => {
        return response.accessToken;
      });
    }
    throw error;
  }
};
```

## Useful Links

- [Azure B2C Documentation](https://docs.microsoft.com/en-us/azure/active-directory-b2c/)
- [MSAL.js Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview)
- [React MSAL Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)
