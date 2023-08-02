import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicProfileComponent } from './basic-profile.component';

describe('BasicProfileComponent', () => {
  let component: BasicProfileComponent;
  let fixture: ComponentFixture<BasicProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
