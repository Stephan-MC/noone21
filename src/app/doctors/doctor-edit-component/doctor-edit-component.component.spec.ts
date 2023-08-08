import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorEditComponentComponent } from './doctor-edit-component.component';

describe('DoctorEditComponentComponent', () => {
  let component: DoctorEditComponentComponent;
  let fixture: ComponentFixture<DoctorEditComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorEditComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
