import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEducationComponent } from './doctor-education.component';

describe('DoctorEducationComponent', () => {
  let component: DoctorEducationComponent;
  let fixture: ComponentFixture<DoctorEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
