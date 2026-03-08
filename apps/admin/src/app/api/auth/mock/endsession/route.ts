import { NextRequest, NextResponse } from 'next/server';

/* ------------------------------------------------------------------
 * Mock OIDC End Session Endpoint
 * ------------------------------------------------------------------ */

/**
 * Simulates a successful logout and redirects back to the application.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postLogoutRedirectUri = searchParams.get('post_logout_redirect_uri');

  // In a real OIDC provider, we would validate the id_token_hint here
  // const idTokenHint = searchParams.get('id_token_hint');

  console.log(`[Mock Auth] End session request received`);

  if (postLogoutRedirectUri) {
    console.log(
      `[Mock Auth] Redirecting after logout to ${postLogoutRedirectUri}`
    );
    return NextResponse.redirect(postLogoutRedirectUri);
  }

  // Default fallback if no redirect URI is provided
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
  return NextResponse.redirect(baseUrl);
}
