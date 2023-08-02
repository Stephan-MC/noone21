import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FaqMasterEditComponent } from './faq-master-edit.component';

describe('FaqMasterEditComponent', () => {
  let component: FaqMasterEditComponent;
  let fixture: ComponentFixture<FaqMasterEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
