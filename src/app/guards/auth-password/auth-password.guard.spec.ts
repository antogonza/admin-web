import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authPasswordGuard } from './auth-password.guard';

describe('authPasswordGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authPasswordGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
