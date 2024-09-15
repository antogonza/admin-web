import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'today',
        loadComponent: () => import('./today/today-orders.component').then(m => m.TodayOrdersComponents),
    },
    {
        path: 'all',
        loadComponent: () => import('./all/all-orders.component').then(m => m.AllOrdersComponents),
    },
    {
        path: 'locals',
        loadComponent: () => import('./locals/locals-orders.component').then(m => m.LocalsOrdersComponents),
    },
];

