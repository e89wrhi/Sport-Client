// Core auth
export { auth, signIn, signOut } from './auth';

// Client-side API calls (for Client Components)
export { apiCall, userApi, ApiError } from './api-client';
export type { CurrentUserResponse, User } from './api-client';

// Server-side API calls (for Server Components & Actions)
export {
  apiCallServer,
  serverApi,
  userServerApi,
  ApiError as ServerApiError,
} from './api-server';

// Client-side permissions (for Client Components)
export { usePermissions, PermissionGuard } from './use-permissions';

// Server-side permissions (for Server Components & Actions)
export {
  requireAuth,
  getPermissions,
  getRoles,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  hasAnyRole,
  hasAllRoles,
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
  requireRole,
  requireAnyRole,
  requireAllRoles,
} from './permissions-server';

// Server actions
export * from './actions';
