import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuyerAppointmentComponent } from './buyer-appointment.component';

describe('BuyerAppointmentComponent', () => {
  let component: BuyerAppointmentComponent;
  let fixture: ComponentFixture<BuyerAppointmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
