import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorConsultationComponent } from './doctor-consultation.component';

describe('DoctorConsultationComponent', () => {
  let component: DoctorConsultationComponent;
  let fixture: ComponentFixture<DoctorConsultationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
