import { TestBed } from '@angular/core/testing';

import { DatosResiduosService } from './datos-residuos.service';

describe('DatosResiduosService', () => {
  let service: DatosResiduosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosResiduosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
