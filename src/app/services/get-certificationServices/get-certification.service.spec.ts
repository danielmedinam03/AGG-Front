import { TestBed } from '@angular/core/testing';

import { GetCertificationService } from './get-certification.service';

describe('GetCertificationService', () => {
  let service: GetCertificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCertificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
