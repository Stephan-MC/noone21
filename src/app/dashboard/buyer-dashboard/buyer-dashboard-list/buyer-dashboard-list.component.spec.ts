import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuyerDashboardListComponent } from './buyer-dashboard-list.component';

describe('BuyerDashboardListComponent', () => {
  let component: BuyerDashboardListComponent;
  let fixture: ComponentFixture<BuyerDashboardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerDashboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
