import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileReviewComponent } from './profile-review.component';

describe('ProfileReviewComponent', () => {
  let component: ProfileReviewComponent;
  let fixture: ComponentFixture<ProfileReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
