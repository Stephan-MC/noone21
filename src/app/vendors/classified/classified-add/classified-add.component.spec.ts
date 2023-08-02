import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedAddComponent } from './classified-add.component';

describe('ClassifiedAddComponent', () => {
  let component: ClassifiedAddComponent;
  let fixture: ComponentFixture<ClassifiedAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifiedAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
