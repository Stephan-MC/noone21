import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullContentHeaderComponent } from './full-content-header.component';

describe('FullContentHeaderComponent', () => {
  let component: FullContentHeaderComponent;
  let fixture: ComponentFixture<FullContentHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullContentHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullContentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
