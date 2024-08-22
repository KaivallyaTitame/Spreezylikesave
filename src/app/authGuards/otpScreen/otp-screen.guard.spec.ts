import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { otpScreenGuard } from './otp-screen.guard';

describe('otpScreenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => otpScreenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
