import { Component, inject, OnInit } from '@angular/core';
import { DiscountsService } from '../../../services/discounts/discounts.service';
import { Discount } from '../../../interfaces/discount.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.scss'
})
export class PromosComponent implements OnInit {

  discountsService = inject(DiscountsService);
  router = inject(Router);
  discounts: Discount[] = [];

  constructor() { }

  ngOnInit(): void {
    this.discountsService.getAllDiscounts().subscribe({
      next: (data: any) => {
        this.discounts = data;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        alert(error.error.message);
      }
    });
  }

  editDiscount(discountId: string): void {
    this.router.navigate(['/promos/edit', discountId]);
  }

  translateDiscountType(type: string) {
    switch (type) {
      case 'PERCENTAGE':
        return 'Porcentaje';
      case 'QUANTITY':
        return 'Cantidad';
      default:
        return 'Desconocido';
    }
  }

  onAddPromo(): void {
    this.router.navigate(['/promos/new']);
  }
}
