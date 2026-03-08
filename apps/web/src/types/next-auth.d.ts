import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    idToken: string;
    error?: string;
    user: {
      id: string;
      email: string;
      name: string;
      sub: string;
      roles: string[];
      permissions: string[];
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    roles?: string[];
    permissions?: string[];
    error?: string;
    sub?: string;
    email?: string;
    name?: string;
  }
}
