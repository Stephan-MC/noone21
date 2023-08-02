import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorConsultationComponent } from './vendor-consultation.component';

describe('VendorConsultationComponent', () => {
  let component: VendorConsultationComponent;
  let fixture: ComponentFixture<VendorConsultationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
