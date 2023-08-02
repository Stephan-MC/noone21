import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorDashboardMainComponent } from './vendor-dashboard-main.component';

describe('VendorDashboardMainComponent', () => {
  let component: VendorDashboardMainComponent;
  let fixture: ComponentFixture<VendorDashboardMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDashboardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
