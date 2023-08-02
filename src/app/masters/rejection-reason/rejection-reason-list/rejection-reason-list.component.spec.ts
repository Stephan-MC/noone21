import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RejectionReasonListComponent } from './rejection-reason-list.component';

describe('RejectionReasonListComponent', () => {
  let component: RejectionReasonListComponent;
  let fixture: ComponentFixture<RejectionReasonListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionReasonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
