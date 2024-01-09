import { TestBed } from '@angular/core/testing';

import { DatosGestorService } from './datos-gestor.service';

describe('DatosGestorService', () => {
  let service: DatosGestorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosGestorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
