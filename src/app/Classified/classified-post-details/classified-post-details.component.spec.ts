import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassifiedPostDetailsComponent } from './classified-post-details.component';

describe('ClassifiedPostDetailsComponent', () => {
  let component: ClassifiedPostDetailsComponent;
  let fixture: ComponentFixture<ClassifiedPostDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifiedPostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
