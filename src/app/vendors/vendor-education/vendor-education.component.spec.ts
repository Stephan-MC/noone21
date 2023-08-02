import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorEducationComponent } from './vendor-education.component';

describe('VendorEducationComponent', () => {
  let component: VendorEducationComponent;
  let fixture: ComponentFixture<VendorEducationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
