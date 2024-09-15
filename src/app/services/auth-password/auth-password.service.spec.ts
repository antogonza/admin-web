import { TestBed } from '@angular/core/testing';

import { AuthPasswordService } from './auth-password.service';

describe('AuthPasswordService', () => {
  let service: AuthPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
