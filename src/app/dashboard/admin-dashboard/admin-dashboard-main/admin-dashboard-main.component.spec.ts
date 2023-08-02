import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDashboardMainComponent } from './admin-dashboard-main.component';

describe('AdminDashboardMainComponent', () => {
  let component: AdminDashboardMainComponent;
  let fixture: ComponentFixture<AdminDashboardMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
