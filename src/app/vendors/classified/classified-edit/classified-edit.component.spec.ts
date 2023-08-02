import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedEditComponent } from './classified-edit.component';

describe('ClassifiedEditComponent', () => {
  let component: ClassifiedEditComponent;
  let fixture: ComponentFixture<ClassifiedEditComponent>;

  beforeEach(async(() => {
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
