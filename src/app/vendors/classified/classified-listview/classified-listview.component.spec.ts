import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedListviewComponent } from './classified-listview.component';

describe('ClassifiedListviewComponent', () => {
  let component: ClassifiedListviewComponent;
  let fixture: ComponentFixture<ClassifiedListviewComponent>;

  beforeEach(async(() => {
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
