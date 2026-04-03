import { createHmac } from 'crypto';
import { env } from 'env.mjs';

// Derive the base URL at runtime so this works in both dev (localhosst:3000)
// and Vercel production (https://<your-app>.vercel.app).
// NEXTAUTH_URL must be set in Vercel project settings.
const getMockBaseUrl = () =>
  (process.env.NEXTAUTH_URL || env.NEXT_PUBLIC_APP_URL).replace(/\/$/, '');

// Mock OIDC Provider for Development/Staging (USE_MOCK_AUTH=true)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MockDuendeProvider: any = {
  id: 'duende',
  name: 'Mock Duende (Dev Only)',
  type: 'oidc',

  clientId: 'user-portal-mock',
  clientSecret: 'mock-secret',

  // Issuer is derived at runtime so JWT 'iss' claim always matches, even on Vercel.
  get issuer() {
    return `${getMockBaseUrl()}/api/auth/mock`;
  },

  // Configure NextAuth to accept HS256 signed ID tokens using the client_secret
  client: {
    id_token_signed_response_alg: 'HS256',
  },
  idToken: true,

  get authorization() {
    return {
      url: `${getMockBaseUrl()}/api/auth/mock/authorize`,
      params: {
        scope: 'openid profile email sports.api offline_access',
        response_type: 'code',
      },
    };
  },

  checks: [],

  // Mock profile mapping
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile(profile: any) {
    return {
      id: profile.sub || 'adm-001',
      userId: profile.userId || profile.sub,
      name: profile.name || 'Mock User',
      email: profile.email || 'user@mock.local',
      image: profile.picture,
      role: profile.role || ['user'],
      permission: profile.permission || [],
    };
  },

  // Override token endpoint to use mock
  get token() {
    return { url: `${getMockBaseUrl()}/api/auth/mock/token` };
  },

  // Override userinfo endpoint to use mock
  get userinfo() {
    return { url: `${getMockBaseUrl()}/api/auth/mock/userinfo` };
  },

  // Override well-known endpoint
  get wellKnown() {
    return `${getMockBaseUrl()}/api/auth/mock/.well-known/openid-configuration`;
  },
};

// Aligned with mock user data from src/mock/users/index.ts
export const MOCK_USERS = {
  user: {
    sub: 'usr-001',
    userId: 'usr-001',
    name: 'Elias Mekonnen',
    email: 'elias.mekonnen@gmail.local',
    preferred_username: 'elias',
    picture: '/a1.png',
    role: ['user'],
    permission: [],
  },
};

export function generateMockTokens(userType: keyof typeof MOCK_USERS = 'user') {
  const user = MOCK_USERS[userType];
  const now = Math.floor(Date.now() / 1000);
  const baseUrl = getMockBaseUrl();

  // Mock access token
  const accessToken = `mock_access_token_${userType}_${now}`;

  // Mock refresh token
  const refreshToken = `mock_refresh_token_${userType}_${now}`;

  // Create ID token (JWT format: header.payload.signature)
  // using unpadded base64url encoding
  const headerParams = { alg: 'HS256', typ: 'JWT' };
  const payloadParams = {
    sub: user.sub,
    userId: user.userId,
    name: user.name,
    email: user.email,
    picture: user.picture,
    role: user.role,
    permission: user.permission,
    iat: now,
    exp: now + 3600,
    // 'iss' must match MockDuendeProvider.issuer — derived from NEXTAUTH_URL
    iss: `${baseUrl}/api/auth/mock`,
    aud: 'user-portal-mock',
  };

  const base64UrlEncode = (str: string) =>
    Buffer.from(str)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const header = base64UrlEncode(JSON.stringify(headerParams));
  const payload = base64UrlEncode(JSON.stringify(payloadParams));

  // Sign with client_secret
  const secret = 'mock-secret';
  const signature = createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const idToken = `${header}.${payload}.${signature}`;

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    id_token: idToken,
    token_type: 'Bearer',
    expires_in: 3600, // 1 hour
    scope: 'openid profile email sports.api offline_access',
  };
}

export function getMockUserInfo(userType: keyof typeof MOCK_USERS = 'user') {
  return MOCK_USERS[userType];
}
