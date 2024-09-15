import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./show-products/products.component').then(m => m.ProductsComponent),
    },
    {
        path: 'new',
        loadComponent: () => import('./product-form/product-form.component').then(m => m.ProductFormComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./product-form/product-form.component').then(m => m.ProductFormComponent),
    }
];

