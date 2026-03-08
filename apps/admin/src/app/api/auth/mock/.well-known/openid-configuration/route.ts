import { NextRequest, NextResponse } from 'next/server';
//import {
//  getMockUserInfo,
//  generateMockTokens,
//} from '../../../../../../auth/mock-provider';

/* ------------------------------------------------------------------
 * Mock OIDC Well-Known Configuration Endpoint
 * ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';

  const wellKnownConfig = {
    issuer: `${baseUrl}/api/auth/mock`,
    authorization_endpoint: `${baseUrl}/api/auth/mock/authorize`,
    token_endpoint: `${baseUrl}/api/auth/mock/token`,
    userinfo_endpoint: `${baseUrl}/api/auth/mock/userinfo`,
    end_session_endpoint: `${baseUrl}/api/auth/mock/endsession`,
    jwks_uri: `${baseUrl}/api/auth/mock/.well-known/jwks`,

    response_types_supported: ['code', 'token', 'id_token'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256'],
    scopes_supported: [
      'openid',
      'profile',
      'email',
      'sports.api',
      'offline_access',
    ],
    token_endpoint_auth_methods_supported: [
      'client_secret_post',
      'client_secret_basic',
    ],
    claims_supported: [
      'sub',
      'name',
      'email',
      'preferred_username',
      'role',
      'permission',
    ],
    code_challenge_methods_supported: ['S256'],
    grant_types_supported: [
      'authorization_code',
      'refresh_token',
      'client_credentials',
    ],
  };

  return NextResponse.json(wellKnownConfig);
}
