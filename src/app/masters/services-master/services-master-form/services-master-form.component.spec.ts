import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicesMasterFormComponent } from './services-master-form.component';

describe('ServicesMasterFormComponent', () => {
  let component: ServicesMasterFormComponent;
  let fixture: ComponentFixture<ServicesMasterFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesMasterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
