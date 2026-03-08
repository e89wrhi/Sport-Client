import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';

// Get the current session on the server
export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return session;
}

// Get permissions for the current user
export async function getPermissions(): Promise<string[]> {
  const session = await auth();
  return session?.user?.permissions || [];
}

// Get roles for the current user
export async function getRoles(): Promise<string[]> {
  const session = await auth();
  return session?.user?.roles || [];
}

// Check if user has a specific permission
export async function hasPermission(permission: string): Promise<boolean> {
  const permissions = await getPermissions();
  return permissions.includes(permission);
}

// Check if user has any of the specified permissions
export async function hasAnyPermission(
  permissionList: string[]
): Promise<boolean> {
  const permissions = await getPermissions();
  return permissionList.some((permission) => permissions.includes(permission));
}

// Check if user has all of the specified permissions
export async function hasAllPermissions(
  permissionList: string[]
): Promise<boolean> {
  const permissions = await getPermissions();
  return permissionList.every((permission) => permissions.includes(permission));
}

// Check if user has a specific role
export async function hasRole(role: string): Promise<boolean> {
  const roles = await getRoles();
  return roles.includes(role);
}

// Check if user has any of the specified roles
export async function hasAnyRole(roleList: string[]): Promise<boolean> {
  const roles = await getRoles();
  return roleList.some((role) => roles.includes(role));
}

// Check if user has all of the specified roles
export async function hasAllRoles(roleList: string[]): Promise<boolean> {
  const roles = await getRoles();
  return roleList.every((role) => roles.includes(role));
}

// Require a specific permission or redirect to unauthorized page
export async function requirePermission(
  permission: string,
  redirectTo: string = '/unauthorized'
) {
  const hasAccess = await hasPermission(permission);

  if (!hasAccess) {
    redirect(redirectTo);
  }
}

// Require any of the specified permissions or redirect
export async function requireAnyPermission(
  permissionList: string[],
  redirectTo: string = '/unauthorized'
) {
  const hasAccess = await hasAnyPermission(permissionList);

  if (!hasAccess) {
    redirect(redirectTo);
  }
}

// Require all of the specified permissions or redirect
export async function requireAllPermissions(
  permissionList: string[],
  redirectTo: string = '/unauthorized'
) {
  const hasAccess = await hasAllPermissions(permissionList);

  if (!hasAccess) {
    redirect(redirectTo);
  }
}

// Require a specific role or redirect
export async function requireRole(
  role: string,
  redirectTo: string = '/unauthorized'
) {
  const hasAccess = await hasRole(role);

  if (!hasAccess) {
    redirect(redirectTo);
  }
}

// Require any of the specified roles or redirect
export async function requireAnyRole(
  roleList: string[],
  redirectTo: string = '/unauthorized'
) {
  const hasAccess = await hasAnyRole(roleList);

  if (!hasAccess) {
    redirect(redirectTo);
  }
}

// Require all of the specified roles or redirect
export async function requireAllRoles(
  roleList: string[],
  redirectTo: string = '/unauthorized'
) {
  const hasAccess = await hasAllRoles(roleList);

  if (!hasAccess) {
    redirect(redirectTo);
  }
}

/**
 * example Server Component with permission check
 * import { requirePermission } from '@/auth/permissions-server';
 *
 * export default async function AdminPage() {
 *   await requirePermission('admin.access');
 *
 *   return <div>Admin Content</div>;
 * }
 *
 * example Server Action with permission check
 
 * 'use server';
 * import { hasPermission } from '@/auth/permissions-server';
 *
 * export async function deleteArticle(id: string) {
 *   if (!await hasPermission('article.delete')) {
 *     throw new Error('Unauthorized');
 *   }
 *
 *   // Delete logic...
 * }
 */
