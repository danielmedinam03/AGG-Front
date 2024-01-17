import { TestBed } from '@angular/core/testing';

import { BandejaCertificacionesService } from './bandeja-certificaciones.service';

describe('BandejaCertificacionesService', () => {
  let service: BandejaCertificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandejaCertificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
