'use server';

import { auth } from './auth';

// get the duende identity-server logout url
export async function getDuendeLogoutUrl() {
  const session = await auth();

  if (!session?.idToken) {
    return null;
  }

  const idToken = session.idToken;

  // Check if we are using mock auth
  const useMockAuth = process.env.USE_MOCK_AUTH === 'true';
  // Use the Duende IdentityServer issuer or fallback to mock
  const issuer = useMockAuth
    ? (process.env.NEXTAUTH_URL || 'http://localhost:3001') + '/api/auth/mock'
    : process.env.AUTH_DUENDE_ISSUER;

  if (!issuer) {
    console.error('AUTH_DUENDE_ISSUER is not defined');
    return null;
  }

  // The address the user should wind up at after logout
  const postLogoutRedirectUri =
    process.env.NEXTAUTH_URL || 'http://localhost:3001';

  // logout endpoint - Real Duende uses /connect/endsession, but our Mock uses /endsession (relative to the mock api root)
  const endpoint = useMockAuth ? '/endsession' : '/connect/endsession';

  const url = `${issuer}${endpoint}?post_logout_redirect_uri=${encodeURIComponent(
    postLogoutRedirectUri
  )}&id_token_hint=${idToken}`;

  return url;
}

// current user session
export async function getCurrentSession() {
  return await auth();
}

// check if current user is authenticated
export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user;
}
