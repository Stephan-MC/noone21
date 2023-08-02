import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FaqMasterAddComponent } from './faq-master-add.component';

describe('FaqMasterAddComponent', () => {
  let component: FaqMasterAddComponent;
  let fixture: ComponentFixture<FaqMasterAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
