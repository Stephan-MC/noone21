import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCoverageComponent } from './media-coverage.component';

describe('MediaCoverageComponent', () => {
  let component: MediaCoverageComponent;
  let fixture: ComponentFixture<MediaCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
