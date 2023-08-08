import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassifiedEditComponent } from './classified-edit.component';

describe('ClassifiedEditComponent', () => {
  let component: ClassifiedEditComponent;
  let fixture: ComponentFixture<ClassifiedEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifiedEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
