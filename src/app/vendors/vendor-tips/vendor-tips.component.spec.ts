import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorTipsComponent } from './vendor-tips.component';

describe('VendorTipsComponent', () => {
  let component: VendorTipsComponent;
  let fixture: ComponentFixture<VendorTipsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
