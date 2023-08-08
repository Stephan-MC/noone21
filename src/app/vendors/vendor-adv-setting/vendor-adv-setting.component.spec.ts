import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorAdvSettingComponent } from './vendor-adv-setting.component';

describe('VendorAdvSettingComponent', () => {
  let component: VendorAdvSettingComponent;
  let fixture: ComponentFixture<VendorAdvSettingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAdvSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAdvSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
