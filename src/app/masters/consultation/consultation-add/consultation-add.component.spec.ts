import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsultationAddComponent } from './consultation-add.component';

describe('ConsultationAddComponent', () => {
  let component: ConsultationAddComponent;
  let fixture: ComponentFixture<ConsultationAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
