import NextAuth from 'next-auth';
import type { OIDCConfig } from 'next-auth/providers';
import { MockDuendeProvider } from './mock-provider';

// validate env variables
const {
  AUTH_DUENDE_ISSUER,
  AUTH_DUENDE_ID,
  AUTH_DUENDE_SECRET,
  REQUIRED_ROLE,
  USE_MOCK_AUTH,
} = process.env;

// Check if we're using mock authentication
const useMockAuth = USE_MOCK_AUTH === 'true';

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

const missingDuendeVars =
  !useMockAuth &&
  (!AUTH_DUENDE_ISSUER || !AUTH_DUENDE_ID || !AUTH_DUENDE_SECRET);

if (missingDuendeVars) {
  // In production without Duende vars — log and fall back gracefully.
  // Set USE_MOCK_AUTH=true or configure the Duende env vars in Vercel.
  console.error(
    '[auth] Missing Duende env vars: AUTH_DUENDE_ISSUER, AUTH_DUENDE_ID, AUTH_DUENDE_SECRET. ' +
    'Set USE_MOCK_AUTH=true or configure the vars in your Vercel project settings.'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DuendeProvider: OIDCConfig<any> = {
  id: 'duende',
  name: 'Duende IdentityServer',
  type: 'oidc',
  issuer: AUTH_DUENDE_ISSUER!,
  clientId: AUTH_DUENDE_ID!,
  clientSecret: AUTH_DUENDE_SECRET!,
  authorization: {
    params: {
      scope: 'openid profile email sports.api offline_access',
      response_type: 'code',
    },
  },
  checks: ['pkce', 'state'],
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name ?? profile.preferred_username,
      email: profile.email,
      image: profile.picture,
      role: profile.role,
      permission: profile.permission,
    };
  },
};

// provider based on the env (mock or prod)
const selectedProvider = useMockAuth ? MockDuendeProvider : DuendeProvider;

if (useMockAuth) {
  console.warn('⚠️  USING MOCK AUTHENTICATION - FOR DEVELOPMENT ONLY');
}

// next-auth config
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const providers: any[] = [selectedProvider];

// Add Credentials Provider
providers.push(
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      // In a real app, you would call your API to validate credentials
      // For development w/ USE_MOCK_AUTH, we accept any credentials with specific patterns or just return a mock user
      if (useMockAuth) {
        if (!credentials?.email || !credentials?.password) return null;

        return {
          id: 'adm-002',
          userId: 'usr-002',
          name: 'Sara Getachew',
          email: credentials.email as string,
          image: '/images/user2.jpg',
          role: ['user'],
          permission: [],
        };
      }

      return null;
    },
  })
);

// Add Google Provider if configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

const config = {
  providers,
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    // JWT Callback - Handle tokens and refresh logic
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, account, profile }: any) {
      // Initial sign in - store tokens and user info
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.idToken = account.id_token;

        // Extract roles from profile
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const roles = (profile as any).role || [];
        const roleArray = Array.isArray(roles) ? roles : [roles];

        // Check if user has required role for public site
        if (REQUIRED_ROLE && !roleArray.includes(REQUIRED_ROLE)) {
          console.warn(
            `User ${profile.email} missing required role: ${REQUIRED_ROLE}. User roles: ${roleArray.join(', ')}`
          );
          return { ...token, error: 'MissingRequiredRole' };
        }

        token.roles = roleArray;

        // Extract permissions from profile
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const permissions = (profile as any).permission || [];
        token.permissions = Array.isArray(permissions)
          ? permissions
          : [permissions];

        // Store user info
        token.sub = profile.sub ?? undefined;
        token.email = profile.email ?? undefined;
        token.name = profile.name ?? undefined;
      }

      // Token refresh logic
      const buffer = 60; // Refresh 60 seconds before expiry
      const currentTimestamp = Math.floor(Date.now() / 1000);

      // If token is still valid, return as is
      if (
        token.expiresAt &&
        currentTimestamp < (token.expiresAt as number) - buffer
      ) {
        return token;
      }

      // Token expired or about to expire - refresh it
      if (token.refreshToken) {
        try {
          console.log('Refreshing access token...');

          // Determine the token endpoint based on auth mode
          const tokenEndpoint = useMockAuth
            ? `${process.env.NEXTAUTH_URL}/api/auth/mock/token`
            : `${AUTH_DUENDE_ISSUER}/connect/token`;

          const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id:
                (useMockAuth ? 'public-site-mock' : AUTH_DUENDE_ID) || '',
              client_secret:
                (useMockAuth ? 'mock-secret' : AUTH_DUENDE_SECRET) || '',
              grant_type: 'refresh_token',
              refresh_token: token.refreshToken as string,
            }),
          });

          const refreshedTokens = await response.json();

          if (!response.ok) {
            console.error('Token refresh failed:', refreshedTokens);
            throw new Error('RefreshAccessTokenError');
          }

          console.log('Token refreshed successfully');

          return {
            ...token,
            accessToken: refreshedTokens.access_token,
            expiresAt: Math.floor(
              Date.now() / 1000 + refreshedTokens.expires_in
            ),
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
            idToken: refreshedTokens.id_token ?? token.idToken,
          };
        } catch (error) {
          console.error('Error refreshing access token:', error);
          return { ...token, error: 'RefreshAccessTokenError' };
        }
      }

      return token;
    },

    // Session Callback - Expose necessary data to client
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      // Add access token for API calls
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      session.error = token.error as string | undefined;

      // Add user info
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.roles = token.roles as string[];
        session.user.permissions = token.permissions as string[];
      }

      return session;
    },

    // Authorized Callback - Control access to routes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async authorized({ auth, request }: any) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      const isAuthPage = pathname.startsWith('/login');

      if (isAuthPage) {
        if (isLoggedIn && !auth?.error) {
          return Response.redirect(new URL('/', request.nextUrl));
        }
        return true;
      }

      if (auth?.error) return false;
      return isLoggedIn;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
