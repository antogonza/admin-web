import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cilBike, cilCheckAlt, cilPrint, cilX } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { Order } from 'src/app/interfaces/order.interface';
import { DecimalFormatPipe } from '../../app/pipes/decimalFormat/decimal-format.pipe';
import { OrdersService } from 'src/app/services/orders/orders-services.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [IconDirective, CommonModule, DecimalFormatPipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  @Input() type: string = '';
  @Input() order?: Order;

  ordersService = inject(OrdersService);

  icons = { cilCheckAlt, cilX, cilBike, cilPrint };

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(OrdersComponent, {
      data: {
        type: 'prueba'
      }
    });
  }

  changeOrderStatus(orderId: string, newStatus: string) {

    this.ordersService.changeOrderStatus(orderId, newStatus).subscribe(
      response => {
        console.log('Cambio de estado exitoso', response);
        location.reload();
      },
      error => {
        console.error('Error de cambio de estado', error)
        alert(error.message);
      }
    );

  }
}
