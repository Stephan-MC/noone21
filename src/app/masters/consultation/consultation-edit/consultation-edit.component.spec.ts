import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsultationEditComponent } from './consultation-edit.component';

describe('ConsultationEditComponent', () => {
  let component: ConsultationEditComponent;
  let fixture: ComponentFixture<ConsultationEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
