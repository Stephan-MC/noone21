import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuyerDashboardMainComponent } from './buyer-dashboard-main.component';

describe('BuyerDashboardMainComponent', () => {
  let component: BuyerDashboardMainComponent;
  let fixture: ComponentFixture<BuyerDashboardMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerDashboardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
