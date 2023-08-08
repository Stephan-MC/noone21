import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicsProfileReviewComponent } from './basics-profile-review.component';

describe('BasicsProfileReviewComponent', () => {
  let component: BasicsProfileReviewComponent;
  let fixture: ComponentFixture<BasicsProfileReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicsProfileReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicsProfileReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
