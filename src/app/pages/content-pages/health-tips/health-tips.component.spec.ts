import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HealthTipsComponent } from './health-tips.component';

describe('HealthTipsComponent', () => {
  let component: HealthTipsComponent;
  let fixture: ComponentFixture<HealthTipsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
