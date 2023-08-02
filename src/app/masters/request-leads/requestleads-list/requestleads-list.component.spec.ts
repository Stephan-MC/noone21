import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequestleadsListComponent } from './requestleads-list.component';

describe('RequestleadsListComponent', () => {
  let component: RequestleadsListComponent;
  let fixture: ComponentFixture<RequestleadsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestleadsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestleadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
