import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(
        (m) => m.LoginComponent,
      ),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then(
        (m) => m.RegisterComponent,
      ),
    title: 'Register',
  },
];
