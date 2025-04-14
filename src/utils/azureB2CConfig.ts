
/**
 * Azure B2C Configuration
 * 
 * This file contains the configuration for Azure B2C authentication.
 * The values below are placeholders and should be replaced with actual values
 * from your Azure B2C tenant.
 */

export const msalConfig = {
  auth: {
    clientId: "your-client-id", // Replace with your actual client ID
    authority: "https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/your-policy",
    knownAuthorities: ["your-tenant.b2clogin.com"], // Replace with your authority domain
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Scopes that you request the token for
export const loginRequest = {
  scopes: ["openid", "profile", "email", "your-api-scope"], // Replace with your actual scopes
};

// Here you can add configurations for different B2C policies like password reset, profile edit, etc.
export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_signupsignin", // Replace with your policy name
    forgotPassword: "B2C_1_passwordreset", // Replace with your policy name
    editProfile: "B2C_1_profileedit", // Replace with your policy name
  },
  authorities: {
    signUpSignIn: {
      authority: "https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_signupsignin",
    },
    forgotPassword: {
      authority: "https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_passwordreset",
    },
    editProfile: {
      authority: "https://your-tenant.b2clogin.com/your-tenant.onmicrosoft.com/B2C_1_profileedit",
    },
  },
  authorityDomain: "your-tenant.b2clogin.com", // Replace with your authority domain
};
