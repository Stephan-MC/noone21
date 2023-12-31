import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkillEditComponent } from './skill-edit.component';

describe('SkillEditComponent', () => {
  let component: SkillEditComponent;
  let fixture: ComponentFixture<SkillEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
