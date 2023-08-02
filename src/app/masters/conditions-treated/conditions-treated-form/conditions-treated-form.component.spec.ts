import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConditionsTreatedFormComponent } from './conditions-treated-form.component';

describe('ConditionsTreatedFormComponent', () => {
  let component: ConditionsTreatedFormComponent;
  let fixture: ComponentFixture<ConditionsTreatedFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsTreatedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsTreatedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
