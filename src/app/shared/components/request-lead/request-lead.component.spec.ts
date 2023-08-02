import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequestLeadComponent } from './request-lead.component';

describe('RequestLeadComponent', () => {
  let component: RequestLeadComponent;
  let fixture: ComponentFixture<RequestLeadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
