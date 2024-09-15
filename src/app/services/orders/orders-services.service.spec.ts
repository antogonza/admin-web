import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders-services.service';

describe('OrdersServicesService', () => {
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
