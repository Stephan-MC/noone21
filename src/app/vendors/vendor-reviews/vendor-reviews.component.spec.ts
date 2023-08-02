import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorReviewsComponent } from './vendor-reviews.component';

describe('VendorReviewsComponent', () => {
  let component: VendorReviewsComponent;
  let fixture: ComponentFixture<VendorReviewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
