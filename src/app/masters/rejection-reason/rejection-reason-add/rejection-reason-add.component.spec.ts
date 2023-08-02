import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RejectionReasonAddComponent } from './rejection-reason-add.component';

describe('RejectionReasonAddComponent', () => {
  let component: RejectionReasonAddComponent;
  let fixture: ComponentFixture<RejectionReasonAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionReasonAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
