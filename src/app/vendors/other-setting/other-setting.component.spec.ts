import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OtherSettingComponent } from './other-setting.component';

describe('OtherSettingComponent', () => {
  let component: OtherSettingComponent;
  let fixture: ComponentFixture<OtherSettingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
