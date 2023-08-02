import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReviewsListComponent } from './reviews-list.component';

describe('ReviewsListComponent', () => {
  let component: ReviewsListComponent;
  let fixture: ComponentFixture<ReviewsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
