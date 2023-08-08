import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorCategoriesComponent } from './doctor-categories.component';

describe('DoctorCategoriesComponent', () => {
  let component: DoctorCategoriesComponent;
  let fixture: ComponentFixture<DoctorCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
