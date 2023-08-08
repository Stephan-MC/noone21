import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassifiedListviewComponent } from './classified-listview.component';

describe('ClassifiedListviewComponent', () => {
  let component: ClassifiedListviewComponent;
  let fixture: ComponentFixture<ClassifiedListviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifiedListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
