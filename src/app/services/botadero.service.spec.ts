import { TestBed } from '@angular/core/testing';

import { BotaderoService } from './botadero.service';

describe('BotaderoService', () => {
  let service: BotaderoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotaderoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
