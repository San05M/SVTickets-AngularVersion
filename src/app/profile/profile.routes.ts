import { Routes } from '@angular/router';
import { numericIdGuard } from '../shared/guards/numeric-id-guard.guard';
import { UserService } from './services/user.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./profile.component').then(
        (m) => m.ProfileComponent,
      ),
    title: 'Profile',
  },
    {
      path: ':id',
      canActivate: [numericIdGuard],
      loadComponent: () =>
        import('./profile.component').then(
          (m) => m.ProfileComponent,
        ),
      resolve: { user: UserService},
      title: 'Profile',
    },
  ];

/*DONE: the routers are bad indicate, change it. */