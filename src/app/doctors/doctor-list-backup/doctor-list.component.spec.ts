import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorListComponent } from './doctor-list.component';

describe('DoctorListComponent', () => {
  let component: DoctorListComponent;
  let fixture: ComponentFixture<DoctorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
