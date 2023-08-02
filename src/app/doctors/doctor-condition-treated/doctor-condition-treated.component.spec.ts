import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConditionTreatedComponent } from './doctor-condition-treated.component';

describe('DoctorConditionTreatedComponent', () => {
  let component: DoctorConditionTreatedComponent;
  let fixture: ComponentFixture<DoctorConditionTreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorConditionTreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorConditionTreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
