import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientTipsComponent } from './patient-tips.component';

describe('PatientTipsComponent', () => {
  let component: PatientTipsComponent;
  let fixture: ComponentFixture<PatientTipsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
