import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Discount } from 'src/app/interfaces/discount.interface';
import { DiscountsService } from 'src/app/services/discounts/discounts.service';

@Component({
  selector: 'app-discount-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {
  discountsService = inject(DiscountsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  discountForm!: FormGroup;
  isEditMode = false;
  discountId!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.discountId = params['id'];
      this.isEditMode = !!this.discountId;
      this.initializeForm();

      if (this.isEditMode) {
        this.discountsService.getDiscountById(this.discountId).subscribe(discount => {
          this.discountForm.patchValue(discount);
        });
      }
    });
  }

  initializeForm(): void {
    this.discountForm = this.fb.group({
      code: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      type: ['', Validators.required],
      remaining: [null, [Validators.required, Validators.min(0)]],
      expiresAt: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.discountForm.invalid) {
      return;
    }

    const discountData: Discount = this.discountForm.value;

    if (this.isEditMode) {
      this.discountsService.updateDiscount(this.discountId, discountData).subscribe(() => {
        alert('Descuento actualizado con éxito');
        this.router.navigate(['/promos']);
      });
    } else {
      this.discountsService.createDiscount(discountData).subscribe(() => {
        alert('Descuento creado con éxito');
        this.router.navigate(['/promos']);
      });
    }
  }
}
