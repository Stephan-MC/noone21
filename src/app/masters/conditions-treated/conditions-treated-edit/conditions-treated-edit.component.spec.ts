import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConditionsTreatedEditComponent } from './conditions-treated-edit.component';

describe('ConditionsTreatedEditComponent', () => {
  let component: ConditionsTreatedEditComponent;
  let fixture: ComponentFixture<ConditionsTreatedEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsTreatedEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsTreatedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
