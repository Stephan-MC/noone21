import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserVerificationComponent } from './user-verification.component';

describe('UserVerificationComponent', () => {
  let component: UserVerificationComponent;
  let fixture: ComponentFixture<UserVerificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
