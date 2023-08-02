import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PakChannelComponent } from './pak-channel.component';

describe('PakChannelComponent', () => {
  let component: PakChannelComponent;
  let fixture: ComponentFixture<PakChannelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PakChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PakChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
