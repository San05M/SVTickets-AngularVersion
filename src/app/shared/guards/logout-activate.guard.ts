import { CanActivateFn } from '@angular/router';

export const logoutActivateGuard: CanActivateFn = (route, state) => {
  return true;
};
