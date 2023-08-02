import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorDashboardMainComponent } from './doctor-dashboard-main.component';

describe('DoctorDashboardMainComponent', () => {
  let component: DoctorDashboardMainComponent;
  let fixture: ComponentFixture<DoctorDashboardMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorDashboardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
