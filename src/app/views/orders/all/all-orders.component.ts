import { Component, inject, OnInit } from '@angular/core';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { OrdersComponent } from '../../../../components/orders/orders.component';
import { Router } from '@angular/router';
import { OrdersService } from '../../../services/orders/orders-services.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../../interfaces/order.interface';
import { AddressesService } from '../../../services/addresses/addresses.service';
import { forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  templateUrl: 'all-orders.component.html',
  standalone: true,
  styleUrl: 'all-orders.component.scss',
  imports: [
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    OrdersComponent,
    CommonModule
  ],
})
export class AllOrdersComponents implements OnInit {
  ordersService = inject(OrdersService);
  addressesService = inject(AddressesService)
  router = inject(Router);
  orders: Order[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ordersService.getOrdersByStatus('COMPLETED').pipe(
      switchMap((data: any) => {
        const orders = data.data as Order[];
        const addressRequests = orders.map((order: Order) => {
          if (order.addressId === 'no-id') {
            // Si el addressId es 'no-id', no se hace la solicitud y se devuelve el pedido tal cual
            return of(order);
          } else {
            // Realiza la solicitud para obtener la dirección si el addressId es válido
            return this.addressesService.getAddressById(order.addressId).pipe(
              map((address: any) => ({
                ...order,
                addressId: address.streetNumber // Reemplazar addressId por streetNumber
              }))
            );
          }
        });
        return forkJoin(addressRequests);
      })
    ).subscribe({
      next: (ordersWithAddress: Order[]) => {
        this.orders = ordersWithAddress;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }
}