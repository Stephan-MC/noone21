import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientAppointmentComponent } from './patient-appointment.component';

describe('PatientAppointmentComponent', () => {
  let component: PatientAppointmentComponent;
  let fixture: ComponentFixture<PatientAppointmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
