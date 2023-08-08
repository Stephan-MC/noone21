import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileReviewApprovalComponent } from './profile-review-approval.component';

describe('ProfileReviewApprovalComponent', () => {
  let component: ProfileReviewApprovalComponent;
  let fixture: ComponentFixture<ProfileReviewApprovalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReviewApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReviewApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
