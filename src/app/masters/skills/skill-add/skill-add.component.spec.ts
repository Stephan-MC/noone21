import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkillAddComponent } from './skill-add.component';

describe('SkillAddComponent', () => {
  let component: SkillAddComponent;
  let fixture: ComponentFixture<SkillAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
