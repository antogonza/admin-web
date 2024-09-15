import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productsService = inject(ProductsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  productForm!: FormGroup;
  isEditMode = false;
  productId!: string;

  productTypes: string[] = ['PIZZA', 'PANINI', 'SANDWICH', 'HAMBURGUESA', 'BAGUETTE', 'COMPARTIR', 'ENSALADA', 'TACO', 'BEBIDA'];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.isEditMode = !!this.productId;
      this.initializeForm();

      if (this.isEditMode) {
        this.productsService.getProductById(this.productId).subscribe(product => {
          this.productForm.patchValue(product);
        });
      }
    });
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      type: ['', Validators.required],
      priceSmall: [null],
      priceMedium: [null],
      priceBig: [null, Validators.required],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      photo: ['']
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      alert('Por favor, rellena todos los campos');
      return;
    }

    const productData: Product = this.productForm.value;

    if (this.isEditMode) {
      this.productsService.updateProduct(this.productId, productData).subscribe(() => {
        alert('Producto actualizado con éxito');
        this.router.navigate(['/products']);
      });
    } else {
      this.productsService.createProduct(productData).subscribe(() => {
        alert('Producto creado con éxito');
        this.router.navigate(['/products']);
      });
    }
  }
}
