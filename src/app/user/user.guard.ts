import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  let isAdmin = false;
  auth.isAdmin$.subscribe(admin => isAdmin = admin);
  return isAdmin;
};
