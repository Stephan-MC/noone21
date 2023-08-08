import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassifiedPostListComponent } from './classified-post-list.component';

describe('ClassifiedPostListComponent', () => {
  let component: ClassifiedPostListComponent;
  let fixture: ComponentFixture<ClassifiedPostListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifiedPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
