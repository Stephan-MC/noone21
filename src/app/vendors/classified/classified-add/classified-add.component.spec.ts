import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassifiedAddComponent } from './classified-add.component';

describe('ClassifiedAddComponent', () => {
  let component: ClassifiedAddComponent;
  let fixture: ComponentFixture<ClassifiedAddComponent>;

  beforeEach(waitForAsync(() => {
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
