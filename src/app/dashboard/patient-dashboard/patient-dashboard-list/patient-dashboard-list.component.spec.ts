import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientDashboardListComponent } from './patient-dashboard-list.component';

describe('PatientDashboardListComponent', () => {
  let component: PatientDashboardListComponent;
  let fixture: ComponentFixture<PatientDashboardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
