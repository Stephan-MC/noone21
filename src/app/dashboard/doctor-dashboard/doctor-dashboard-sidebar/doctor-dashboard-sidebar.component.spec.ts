import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorDashboardSidebarComponent } from './doctor-dashboard-sidebar.component';

describe('DoctorDashboardSidebarComponent', () => {
  let component: DoctorDashboardSidebarComponent;
  let fixture: ComponentFixture<DoctorDashboardSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorDashboardSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDashboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
