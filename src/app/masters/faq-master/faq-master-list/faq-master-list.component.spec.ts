import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FaqMasterListComponent } from './faq-master-list.component';

describe('FaqMasterListComponent', () => {
  let component: FaqMasterListComponent;
  let fixture: ComponentFixture<FaqMasterListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
