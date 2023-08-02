import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicesMasterAddComponent } from './services-master-add.component';

describe('ServicesMasterAddComponent', () => {
  let component: ServicesMasterAddComponent;
  let fixture: ComponentFixture<ServicesMasterAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
