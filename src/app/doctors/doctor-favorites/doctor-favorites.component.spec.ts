import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFavoritesComponent } from './doctor-favorites.component';

describe('DoctorFavoritesComponent', () => {
  let component: DoctorFavoritesComponent;
  let fixture: ComponentFixture<DoctorFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
