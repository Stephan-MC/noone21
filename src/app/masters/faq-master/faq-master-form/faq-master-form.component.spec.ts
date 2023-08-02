import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FaqMasterFormComponent } from './faq-master-form.component';

describe('FaqMasterFormComponent', () => {
  let component: FaqMasterFormComponent;
  let fixture: ComponentFixture<FaqMasterFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqMasterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
