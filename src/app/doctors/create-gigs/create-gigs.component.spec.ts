import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGigsComponent } from './create-gigs.component';

describe('CreateGigsComponent', () => {
  let component: CreateGigsComponent;
  let fixture: ComponentFixture<CreateGigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
