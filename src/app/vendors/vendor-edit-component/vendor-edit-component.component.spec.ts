import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorEditComponentComponent } from './vendor-edit-component.component';

describe('VendorEditComponentComponent', () => {
  let component: VendorEditComponentComponent;
  let fixture: ComponentFixture<VendorEditComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEditComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
