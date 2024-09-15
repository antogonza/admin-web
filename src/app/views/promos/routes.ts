import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./show-promos/promos.component').then(m => m.PromosComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./promo-form/promo-form.component').then(m => m.PromoFormComponent),
    },
    {
        path: 'new',
        loadComponent: () => import('./promo-form/promo-form.component').then(m => m.PromoFormComponent),
    },
];

