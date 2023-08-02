import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RejectionReasonFormComponent } from './rejection-reason-form.component';

describe('RejectionReasonFormComponent', () => {
  let component: RejectionReasonFormComponent;
  let fixture: ComponentFixture<RejectionReasonFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionReasonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionReasonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
