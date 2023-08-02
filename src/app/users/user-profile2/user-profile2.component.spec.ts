import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserProfile2Component } from './user-profile2.component';

describe('UserProfile2Component', () => {
  let component: UserProfile2Component;
  let fixture: ComponentFixture<UserProfile2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfile2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
