import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicesMasterListComponent } from './services-master-list.component';

describe('ServicesMasterListComponent', () => {
  let component: ServicesMasterListComponent;
  let fixture: ComponentFixture<ServicesMasterListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
