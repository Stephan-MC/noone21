import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorConditionTreatedComponent } from './vendor-condition-treated.component';

describe('VendorConditionTreatedComponent', () => {
  let component: VendorConditionTreatedComponent;
  let fixture: ComponentFixture<VendorConditionTreatedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorConditionTreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorConditionTreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
