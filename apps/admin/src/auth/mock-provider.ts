import { createHmac } from 'crypto';

// Mock OIDC Provider for Development
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MockDuendeProvider: any = {
  id: 'duende',
  name: 'Mock Duende (Dev Only)',
  type: 'oidc',

  clientId: 'admin-portal-mock',
  clientSecret: 'mock-secret',

  // Explicitly set issuer to match the 'iss' claim in our tokens
  issuer: 'http://localhost:3001/api/auth/mock',

  // Configure NextAuth to accept HS256 signed ID tokens using the client_secret
  client: {
    id_token_signed_response_alg: 'HS256',
  },
  idToken: true,

  authorization: {
    url: 'http://localhost:3001/api/auth/mock/authorize',
    params: {
      scope: 'openid profile email sports.api offline_access',
      response_type: 'code',
    },
  },

  checks: [],

  // Mock profile mapping
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile(profile: any) {
    return {
      id: profile.sub || 'adm-001',
      userId: profile.userId || profile.sub,
      name: profile.name || 'Mock Admin User',
      email: profile.email || 'admin@mock.local',
      image: profile.picture,
      role: profile.role || ['user'],
      permission: profile.permission || [],
    };
  },

  // Override token endpoint to use mock
  token: {
    url: 'http://localhost:3001/api/auth/mock/token',
  },

  // Override userinfo endpoint to use mock
  userinfo: {
    url: 'http://localhost:3001/api/auth/mock/userinfo',
  },

  // Override well-known endpoint - Disabled to prevent server-side fetch issues
  wellKnown:
    'http://localhost:3001/api/auth/mock/.well-known/openid-configuration',
};

// Aligned with mock admin data from src/mock/admins/index.ts
export const MOCK_USERS = {
  user: {
    sub: 'adm-007', // Matches Samuel Yared
    userId: 'usr-007',
    name: 'Samuel Yared',
    email: 'samuel.yared@gmail.local',
    preferred_username: 'samuel',
    picture: '/images/admin7.jpg',
    role: ['user'],
    permission: [],
  },
};

export function generateMockTokens(userType: keyof typeof MOCK_USERS = 'user') {
  const user = MOCK_USERS[userType];
  const now = Math.floor(Date.now() / 1000);

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
    iss: 'http://localhost:3001/api/auth/mock',
    aud: 'admin-portal-mock',
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
