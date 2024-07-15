import { TestBed } from '@angular/core/testing';

import { DcrService } from './dcr.service';

describe('DcrService', () => {
  let service: DcrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
