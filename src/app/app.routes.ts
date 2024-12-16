import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.routes)
  },
  
  {
    path: 'events',
    loadChildren: () => import('./events/events.routes').then(m => m.routes)
  },

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.routes').then(m => m.routes)
  },

  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '/events',
  },
];
