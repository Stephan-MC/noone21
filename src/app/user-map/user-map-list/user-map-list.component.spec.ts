import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMapListComponent } from './user-map-list.component';

describe('UserMapListComponent', () => {
  let component: UserMapListComponent;
  let fixture: ComponentFixture<UserMapListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
