import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConditionsTreatedListComponent } from './conditions-treated-list.component';

describe('ConditionsTreatedListComponent', () => {
  let component: ConditionsTreatedListComponent;
  let fixture: ComponentFixture<ConditionsTreatedListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsTreatedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsTreatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
