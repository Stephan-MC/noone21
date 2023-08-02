import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConditionsTreatedAddComponent } from './conditions-treated-add.component';

describe('ConditionsTreatedAddComponent', () => {
  let component: ConditionsTreatedAddComponent;
  let fixture: ComponentFixture<ConditionsTreatedAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsTreatedAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsTreatedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
