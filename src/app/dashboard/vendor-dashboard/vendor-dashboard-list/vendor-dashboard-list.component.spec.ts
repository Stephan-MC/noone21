import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorDashboardListComponent } from './vendor-dashboard-list.component';

describe('VendorDashboardListComponent', () => {
  let component: VendorDashboardListComponent;
  let fixture: ComponentFixture<VendorDashboardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDashboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
