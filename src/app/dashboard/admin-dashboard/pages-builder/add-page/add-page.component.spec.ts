import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPageComponent } from './add-page.component';

describe('AddPageComponent', () => {
  let component: AddPageComponent;
  let fixture: ComponentFixture<AddPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
