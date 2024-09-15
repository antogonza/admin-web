import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { PendingViewComponent } from '../../tabs/pending-view/pending-view.component';
import { KitchenViewComponent } from '../../tabs/kitchen-view/kitchen-view.component';
import { DeliveryViewComponent } from '../../tabs/delivery-view/delivery-view.component';

@Component({
  templateUrl: 'today-orders.component.html',
  standalone: true,
  styleUrl: 'today-orders.component.scss',
  imports: [
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatTabsModule,
    DeliveryViewComponent,
    PendingViewComponent,
    KitchenViewComponent
  ],
})
export class TodayOrdersComponents {
  constructor() { }

  onTabChange(index: number): void {
    console.log('Pestaña seleccionada:', index);
    // Lógica adicional aquí
  }
}
