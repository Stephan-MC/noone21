import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientDashboardSidebarComponent } from './patient-dashboard-sidebar.component';

describe('PatientDashboardSidebarComponent', () => {
  let component: PatientDashboardSidebarComponent;
  let fixture: ComponentFixture<PatientDashboardSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
