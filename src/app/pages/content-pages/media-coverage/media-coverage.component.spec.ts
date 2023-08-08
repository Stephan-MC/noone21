import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediaCoverageComponent } from './media-coverage.component';

describe('MediaCoverageComponent', () => {
  let component: MediaCoverageComponent;
  let fixture: ComponentFixture<MediaCoverageComponent>;

  beforeEach(waitForAsync(() => {
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
