import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorServicesComponent } from './doctor-services.component';

describe('DoctorServicesComponent', () => {
  let component: DoctorServicesComponent;
  let fixture: ComponentFixture<DoctorServicesComponent>;

  beforeEach(async(() => {
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
