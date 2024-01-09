import { TestBed } from '@angular/core/testing';

import { DatosGeneradorService } from './datos-generador.service';

describe('DatosGeneradorService', () => {
  let service: DatosGeneradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosGeneradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
