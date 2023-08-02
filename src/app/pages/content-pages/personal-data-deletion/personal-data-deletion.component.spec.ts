import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonalDataDeletionComponent } from './personal-data-deletion.component';

describe('PersonalDataDeletionComponent', () => {
  let component: PersonalDataDeletionComponent;
  let fixture: ComponentFixture<PersonalDataDeletionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDataDeletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDataDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
