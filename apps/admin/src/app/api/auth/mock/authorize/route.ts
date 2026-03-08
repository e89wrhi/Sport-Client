import { NextRequest, NextResponse } from 'next/server';

/* ------------------------------------------------------------------
 * Mock OIDC Authorization Endpoint
 * ------------------------------------------------------------------ */

/**
 * Simulates a successful login and redirects back to the application
 * with a mock authorization code.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const redirectUri = searchParams.get('redirect_uri');
  const state = searchParams.get('state');
  //const responseType = searchParams.get('response_type');

  if (!redirectUri) {
    return new NextResponse('Missing redirect_uri', { status: 400 });
  }

  // In a real OIDC flow, this is where the user would log in.
  // For our mock, we just skip straight to the callback.
  const callbackUrl = new URL(redirectUri);
  callbackUrl.searchParams.set('code', 'mock_authorization_code');

  if (state) {
    callbackUrl.searchParams.set('state', state);
  }

  console.log(`[Mock Auth] Redirecting to ${callbackUrl.toString()}`);

  return NextResponse.redirect(callbackUrl);
}
