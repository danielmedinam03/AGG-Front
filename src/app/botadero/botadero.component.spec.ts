import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaderoComponent } from './botadero.component';

describe('BotaderoComponent', () => {
  let component: BotaderoComponent;
  let fixture: ComponentFixture<BotaderoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaderoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
