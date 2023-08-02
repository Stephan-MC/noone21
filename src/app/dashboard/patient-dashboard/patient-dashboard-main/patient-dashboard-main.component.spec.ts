import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientDashboardMainComponent } from './patient-dashboard-main.component';

describe('PatientDashboardMainComponent', () => {
  let component: PatientDashboardMainComponent;
  let fixture: ComponentFixture<PatientDashboardMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
