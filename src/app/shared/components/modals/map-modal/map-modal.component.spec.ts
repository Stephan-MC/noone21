import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapModalComponent } from './map-modal.component';

describe('MapModalComponent', () => {
  let component: MapModalComponent;
  let fixture: ComponentFixture<MapModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
