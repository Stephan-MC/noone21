import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorDashboardListComponent } from './doctor-dashboard-list.component';

describe('DoctorDashboardListComponent', () => {
  let component: DoctorDashboardListComponent;
  let fixture: ComponentFixture<DoctorDashboardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorDashboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
