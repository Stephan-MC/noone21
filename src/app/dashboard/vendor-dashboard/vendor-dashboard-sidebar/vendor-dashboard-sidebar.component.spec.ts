import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorDashboardSidebarComponent } from './vendor-dashboard-sidebar.component';

describe('VendorDashboardSidebarComponent', () => {
  let component: VendorDashboardSidebarComponent;
  let fixture: ComponentFixture<VendorDashboardSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDashboardSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDashboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
