import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageFormComponent } from './page-form.component';

describe('PageFormComponent', () => {
  let component: PageFormComponent;
  let fixture: ComponentFixture<PageFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
