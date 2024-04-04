import { TestBed } from '@angular/core/testing';

import { SifServiceService } from './sif-service.service';

describe('SifServiceService', () => {
  let service: SifServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SifServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
