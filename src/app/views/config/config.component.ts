import { Component, inject, OnInit } from '@angular/core';
import { LocalsService } from '../../services/locals/locals.service';
import { Router } from '@angular/router';
import { Local } from '../../interfaces/local.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent implements OnInit {

  localForm!: FormGroup;
  localTypesAllowed = ['PIZZA', 'PANINI', 'SANDWICH', 'HAMBURGUESA', 'BAGUETTE', 'COMPARTIR', 'ENSALADA', 'TACO', 'BEBIDA'];
  fb = inject(FormBuilder);
  localsService = inject(LocalsService)
  fieldsLocked = true;

  constructor() { }

  ngOnInit(): void {
    // Inicializa el formulario
    this.localForm = this.fb.group({
      deliveryPrice: [{ value: 1.5, disabled: true }],
      extraPrice: [{ value: 1, disabled: true }],
      freeShipping: [{ value: 50, disabled: true }],
      timePerProduct: [2.5, Validators.required],
      deliveryTime: [{ value: 10, disabled: true }],
      minDeliveryTime: [30, Validators.required],
      firstDeliver: ['21:02', Validators.required],
      localType: [{ value: 'PIZZA,PANINI,SANDWICH,HAMBURGUESA,BAGUETTE,COMPARTIR,ENSALADA,TACO,BEBIDA', disabled: true }],
      unlockPassword: ['']
    });

    // Llama al servicio para obtener los datos del local
    this.localsService.getOneLocal().subscribe((local: any) => {

      // Poner los datos del local en el formulario
      this.localForm.patchValue({
        deliveryPrice: local.deliveryPrice,
        extraPrice: local.extraPrice,
        freeShipping: local.freeShipping,
        timePerProduct: local.timePerProduct,
        deliveryTime: local.deliveryTime,
        minDeliveryTime: local.minDeliveryTime,
        firstDeliver: local.firstDeliver,
        localType: local.localType.join(',')
      });
    });
  }

  unlockFields(): void {
    const password = this.localForm.get('unlockPassword')?.value;
    console.log(password);

    if (password === '12345') {
      this.fieldsLocked = false;
      this.localForm.get('deliveryPrice')?.enable();
      this.localForm.get('extraPrice')?.enable();
      this.localForm.get('freeShipping')?.enable();
      this.localForm.get('deliveryTime')?.enable();
      this.localForm.get('localType')?.enable();
      alert('Campos desbloqueados.');
    } else {
      alert('Contraseña incorrecta.');
    }
  }

  onSubmit(): void {
    if (this.localForm.valid) {
      // Realizar la actualización de los datos
      const formValue = this.localForm.getRawValue();
      delete formValue.unlockPassword;
      if (formValue.localType) {
        formValue.localType = formValue.localType.split(',').map((type: string) => type.trim());
      }
      this.localsService.updateLocal(formValue).subscribe({
        next: () => alert('Datos actualizados correctamente.'),
        error: (err: any) => alert('Error al actualizar los datos.')
      });
    }
  }
}
