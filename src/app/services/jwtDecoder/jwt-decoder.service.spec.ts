import { TestBed } from '@angular/core/testing';

import { JwtDecoderService } from './jwt-decoder.service';

describe('JwtDecoderService', () => {
  let service: JwtDecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtDecoderService);
  });

  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
