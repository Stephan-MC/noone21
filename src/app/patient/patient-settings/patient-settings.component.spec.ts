import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientSettingsComponent } from './patient-settings.component';

describe('PatientSettingsComponent', () => {
  let component: PatientSettingsComponent;
  let fixture: ComponentFixture<PatientSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
