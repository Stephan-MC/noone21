import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicesMasterEditComponent } from './services-master-edit.component';

describe('ServicesMasterEditComponent', () => {
  let component: ServicesMasterEditComponent;
  let fixture: ComponentFixture<ServicesMasterEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
