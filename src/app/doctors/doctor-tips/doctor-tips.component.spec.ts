import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTipsComponent } from './doctor-tips.component';

describe('DoctorTipsComponent', () => {
  let component: DoctorTipsComponent;
  let fixture: ComponentFixture<DoctorTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
