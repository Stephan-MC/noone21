import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuyerTipsComponent } from './buyer-tips.component';

describe('BuyerTipsComponent', () => {
  let component: BuyerTipsComponent;
  let fixture: ComponentFixture<BuyerTipsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
