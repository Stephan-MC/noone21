import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorServicesComponent } from './vendor-services.component';

describe('VendorServicesComponent', () => {
  let component: VendorServicesComponent;
  let fixture: ComponentFixture<VendorServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
