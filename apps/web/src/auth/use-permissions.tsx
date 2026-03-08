'use client';

import { useSession } from 'next-auth/react';

/**
 * Hook to check if the current user has specific permissions
 *
 * example
 * 'use client';
 * import { usePermissions } from '@/auth/use-permissions';
 *
 * function DeleteButton() {
 *   const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();
 *
 *   if (!hasPermission('article.delete')) {
 *     return null;
 *   }
 *
 *   return <button>Delete</button>;
 * }
 */
export function usePermissions() {
  const { data: session } = useSession();
  const permissions = session?.user?.permissions || [];
  const roles = session?.user?.roles || [];

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some((permission) =>
      permissions.includes(permission)
    );
  };

  // Check if user has all of the specified permissions
  const hasAllPermissions = (permissionList: string[]): boolean => {
    return permissionList.every((permission) =>
      permissions.includes(permission)
    );
  };

  // Check if user has a specific role
  const hasRole = (role: string): boolean => {
    return roles.includes(role);
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roleList: string[]): boolean => {
    return roleList.some((role) => roles.includes(role));
  };

  // Check if user has all of the specified roles
  const hasAllRoles = (roleList: string[]): boolean => {
    return roleList.every((role) => roles.includes(role));
  };

  return {
    permissions,
    roles,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isUser: hasRole('user'),
  };
}

interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: string;
  permissions?: string[];
  requireAll?: boolean;
  role?: string;
  roles?: string[];
  fallback?: React.ReactNode;
}

/**
 * <PermissionGuard permission="article.delete">
 *   <button>Delete</button>
 * </PermissionGuard>
 *
 * <PermissionGuard permissions={['article.create', 'article.edit']} requireAll={false}>
 *   <button>Edit or Create</button>
 * </PermissionGuard>
 */
export function PermissionGuard({
  children,
  permission,
  permissions: permissionList,
  requireAll = true,
  role,
  roles: roleList,
  fallback = null,
}: PermissionGuardProps) {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    hasAllRoles,
  } = usePermissions();

  let hasAccess = true;

  // Check single permission
  if (permission && !hasPermission(permission)) {
    hasAccess = false;
  }

  // Check multiple permissions
  if (permissionList && permissionList.length > 0) {
    if (requireAll) {
      hasAccess = hasAllPermissions(permissionList);
    } else {
      hasAccess = hasAnyPermission(permissionList);
    }
  }

  // Check single role
  if (role && !hasRole(role)) {
    hasAccess = false;
  }

  // Check multiple roles
  if (roleList && roleList.length > 0) {
    if (requireAll) {
      hasAccess = hasAllRoles(roleList);
    } else {
      hasAccess = hasAnyRole(roleList);
    }
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
