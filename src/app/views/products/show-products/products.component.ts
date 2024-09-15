import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productsService = inject(ProductsService);
  router = inject(Router);
  products: Product[] = [];
  categories: { [key: string]: Product[] } = {};

  constructor() { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data.data;
        this.groupProductsByCategory();
        console.log(this.categories);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        alert(error.error.message);
      }
    });
  }

  groupProductsByCategory(): void {
    this.categories = this.products.reduce((acc, product) => {
      if (!acc[product.type]) {
        acc[product.type] = [];
      }
      acc[product.type].push(product);
      return acc;
    }, {} as { [key: string]: Product[] });
  }

  getCategoryNames(): string[] {
    return Object.keys(this.categories);
  }


  getPriceString(product: Product): string {
    if (product.isMultiSize) {
      return `${product.priceSmall}€ - ${product.priceMedium}€ - ${product.priceBig}€`;
    }
    return `${product.priceBig}€`;
  }

  onAddProduct(): void {
    this.router.navigate(['/products/new']);
  }

  onEditProduct(productId: string): void {
    this.router.navigate([`/products/edit/${productId}`]);
  }
}
