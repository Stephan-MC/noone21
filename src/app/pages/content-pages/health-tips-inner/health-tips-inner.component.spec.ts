import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HealthTipsInnerComponent } from './health-tips-inner.component';

describe('HealthTipsInnerComponent', () => {
  let component: HealthTipsInnerComponent;
  let fixture: ComponentFixture<HealthTipsInnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthTipsInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthTipsInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
