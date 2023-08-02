import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedPostDetailsComponent } from './classified-post-details.component';

describe('ClassifiedPostDetailsComponent', () => {
  let component: ClassifiedPostDetailsComponent;
  let fixture: ComponentFixture<ClassifiedPostDetailsComponent>;

  beforeEach(async(() => {
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
