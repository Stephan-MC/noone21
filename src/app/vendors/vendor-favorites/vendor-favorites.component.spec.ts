import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorFavoritesComponent } from './vendor-favorites.component';

describe('VendorFavoritesComponent', () => {
  let component: VendorFavoritesComponent;
  let fixture: ComponentFixture<VendorFavoritesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
