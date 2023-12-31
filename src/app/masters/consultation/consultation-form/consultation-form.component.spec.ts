import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsultationFormComponent } from './consultation-form.component';

describe('ConsultationFormComponent', () => {
  let component: ConsultationFormComponent;
  let fixture: ComponentFixture<ConsultationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
