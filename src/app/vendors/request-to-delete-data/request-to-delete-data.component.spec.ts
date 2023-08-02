import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequestToDeleteDataComponent } from './request-to-delete-data.component';

describe('RequestToDeleteDataComponent', () => {
  let component: RequestToDeleteDataComponent;
  let fixture: ComponentFixture<RequestToDeleteDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestToDeleteDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToDeleteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
