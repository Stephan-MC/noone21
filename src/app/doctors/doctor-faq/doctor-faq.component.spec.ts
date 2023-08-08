import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorFaqComponent } from './doctor-faq.component';

describe('DoctorFaqComponent', () => {
  let component: DoctorFaqComponent;
  let fixture: ComponentFixture<DoctorFaqComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
