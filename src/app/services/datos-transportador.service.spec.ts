import { TestBed } from '@angular/core/testing';

import { DatosTransportadorService } from './datos-transportador.service';

describe('DatosTransportadorService', () => {
  let service: DatosTransportadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosTransportadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
