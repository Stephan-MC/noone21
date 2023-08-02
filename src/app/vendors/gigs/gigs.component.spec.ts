import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GigsComponent } from './gigs.component';

describe('GigsComponent', () => {
  let component: GigsComponent;
  let fixture: ComponentFixture<GigsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
