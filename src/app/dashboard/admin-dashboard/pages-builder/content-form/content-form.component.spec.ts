import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentFormComponent } from './content-form.component';

describe('ContentFormComponent', () => {
  let component: ContentFormComponent;
  let fixture: ComponentFixture<ContentFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
