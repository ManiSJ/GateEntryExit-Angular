import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'] as string[];
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  const userRoles = authService.getRoles();
  console.log(userRoles);
  console.log(roles);

  if (roles.some((role) => userRoles?.includes(role))) return true;
  router.navigate(['/']);
  return false;
};
