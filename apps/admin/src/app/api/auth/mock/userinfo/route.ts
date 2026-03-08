import { NextRequest, NextResponse } from 'next/server';
import { getMockUserInfo } from '../../../../../auth/mock-provider';

/* ------------------------------------------------------------------
 * Mock UserInfo Endpoint
 * ------------------------------------------------------------------ */

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          error: 'invalid_token',
          error_description: 'Missing or invalid authorization header',
        },
        { status: 401 }
      );
    }

    // Extract token and determine user type
    const token = authHeader.substring(7);
    const tokenParts = token.split('_');

    // Extract user type from token (format: mock_access_token_{userType}_{timestamp})
    const userType = tokenParts[3] || 'admin';

    // Validate user type
    const validUserTypes = ['admin', 'profile', 'user'];
    const selectedUserType = validUserTypes.includes(userType)
      ? userType
      : 'admin';

    // Return mock user info
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userInfo = getMockUserInfo(selectedUserType as any);

    return NextResponse.json(userInfo);
  } catch (error) {
    console.error('Mock userinfo endpoint error:', error);
    return NextResponse.json(
      { error: 'server_error', error_description: 'Internal server error' },
      { status: 500 }
    );
  }
}
