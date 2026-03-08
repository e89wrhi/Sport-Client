import { NextRequest, NextResponse } from 'next/server';
import { generateMockTokens } from '../../../../../auth/mock-provider';

/* ------------------------------------------------------------------
 * Mock Token Endpoint
 * ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const grantType = body.get('grant_type');

    // Determine user type from request or default to user
    const userType = (body.get('username') as string) || 'user';

    // Validate user type
    const validUserTypes = ['admin', 'profile', 'user'];
    const selectedUserType = validUserTypes.includes(userType)
      ? userType
      : 'user';

    if (grantType === 'authorization_code') {
      // Initial token request
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokens = generateMockTokens(selectedUserType as any);

      return NextResponse.json(tokens);
    } else if (grantType === 'refresh_token') {
      // Token refresh
      const refreshToken = body.get('refresh_token');

      if (!refreshToken) {
        return NextResponse.json(
          {
            error: 'invalid_request',
            error_description: 'Missing refresh_token',
          },
          { status: 400 }
        );
      }

      // Extract user type from refresh token
      const tokenParts = (refreshToken as string).split('_');
      const tokenUserType = tokenParts[3] || 'user';
      const validTokenUserType = validUserTypes.includes(tokenUserType)
        ? tokenUserType
        : 'user';

      // Generate new tokens
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokens = generateMockTokens(validTokenUserType as any);

      return NextResponse.json(tokens);
    } else {
      return NextResponse.json(
        {
          error: 'unsupported_grant_type',
          error_description: `Grant type ${grantType} not supported`,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Mock token endpoint error:', error);
    return NextResponse.json(
      { error: 'server_error', error_description: 'Internal server error' },
      { status: 500 }
    );
  }
}
