import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrdersComponent } from "../../../../components/orders/orders.component";
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersService } from 'src/app/services/orders/orders-services.service';
import { switchMap, of, map, forkJoin } from 'rxjs';
import { AddressesService } from 'src/app/services/addresses/addresses.service';

@Component({
  selector: 'app-delivery-view',
  standalone: true,
  imports: [
    CommonModule,
    OrdersComponent
  ],
  templateUrl: './delivery-view.component.html',
  styleUrl: './delivery-view.component.scss'
})
export class DeliveryViewComponent {
  ordersService = inject(OrdersService);
  addressesService = inject(AddressesService)
  router = inject(Router);
  orders: Order[] = [];

  constructor() { }

  ngOnInit(): void {
    // Llamada al método getOrdersByStatus del servicio
    this.ordersService.getOrdersByStatus('DELIVERING').pipe(
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