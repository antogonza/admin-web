import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './guards/auth/auth.guard';
import { noAuthGuard } from './guards/noAuth/no-auth.guard';
import { authPasswordGuard } from './guards/auth-password/auth-password.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/orders/routes').then((m) => m.routes)
      },
      {
        path: 'products',
        loadChildren: () => import('./views/products/routes').then((m) => m.routes),
        canActivate: [authPasswordGuard]
      },
      {
        path: 'promos',
        loadChildren: () => import('./views/promos/routes').then((m) => m.routes),
        canActivate: [authPasswordGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/routes').then((m) => m.routes),
        canActivate: [authPasswordGuard]
      },
      {
        path: 'config',
        loadChildren: () => import('./views/config/routes').then((m) => m.routes),
      },
    ],
    canActivate: [authGuard]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    },
    canActivate: [noAuthGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    },
    canActivate: [noAuthGuard]
  },
  {
    path: 'password-protect', // Ruta para la página de contraseña
    loadComponent: () => import('./views/pages/password/password.component').then(m => m.PasswordComponent),
    data: {
      title: 'Password Protect'
    },
    canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: 'dashboard'
  }
];
