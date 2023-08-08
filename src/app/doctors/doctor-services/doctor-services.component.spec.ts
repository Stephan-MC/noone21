import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorServicesComponent } from './doctor-services.component';

describe('DoctorServicesComponent', () => {
  let component: DoctorServicesComponent;
  let fixture: ComponentFixture<DoctorServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
