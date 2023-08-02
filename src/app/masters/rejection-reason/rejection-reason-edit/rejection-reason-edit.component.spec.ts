import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RejectionReasonEditComponent } from './rejection-reason-edit.component';

describe('RejectionReasonEditComponent', () => {
  let component: RejectionReasonEditComponent;
  let fixture: ComponentFixture<RejectionReasonEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionReasonEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionReasonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
