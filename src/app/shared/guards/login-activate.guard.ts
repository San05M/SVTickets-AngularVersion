import { CanActivateFn } from '@angular/router';

export const loginActivateGuard: CanActivateFn = (route, state) => {
  return true;
};
