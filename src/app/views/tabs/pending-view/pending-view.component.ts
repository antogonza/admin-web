import { Component, inject } from '@angular/core';
import { OrdersComponent } from "../../../../components/orders/orders.component";
import { Router } from '@angular/router';
import { mapJsonToOrder, Order } from 'src/app/interfaces/order.interface';
import { OrdersService } from 'src/app/services/orders/orders-services.service';
import { CommonModule } from '@angular/common';
import { switchMap, of, map, forkJoin } from 'rxjs';
import { AddressesService } from 'src/app/services/addresses/addresses.service';
import { connectToServer } from '../../../sockets/socket-client';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-pending-view',
  standalone: true,
  imports: [
    OrdersComponent,
    CommonModule,
  ],
  templateUrl: './pending-view.component.html',
  styleUrl: './pending-view.component.scss'
})
export class PendingViewComponent {
  ordersService = inject(OrdersService);
  addressesService = inject(AddressesService)
  router = inject(Router);
  orders: Order[] = [];
  socket!: Socket;

  constructor() { }

  ngOnInit(): void {
    this.connectToSocket();
    // Llamada al método getOrdersByStatus del servicio
    this.ordersService.getOrdersByStatus('WAITING').pipe(
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

  connectToSocket() {
    this.socket = connectToServer(); // Conectar al servidor de sockets
    this.socket.on('new-order', (payload: any) => {
      const newOrder = mapJsonToOrder(payload);
      this.handleNewOrder(newOrder);
    })
  }

  handleNewOrder(newOrder: Order) {// Realizar la solicitud para obtener la dirección si el addressId es válido
    if (newOrder.addressId !== 'no-id') {
      this.addressesService.getAddressById(newOrder.addressId).pipe(
        map((address: any) => ({
          ...newOrder,
          addressId: address.streetNumber // Reemplazar addressId por streetNumber
        }))
      ).subscribe((updatedOrder: Order) => {
        this.orders = [updatedOrder, ...this.orders]; // Añadir el nuevo pedido al array de pedidos
      });
    } else {
      // Si el addressId es 'no-id', agregar el pedido tal cual
      this.orders = [newOrder, ...this.orders];
    }
  }
}