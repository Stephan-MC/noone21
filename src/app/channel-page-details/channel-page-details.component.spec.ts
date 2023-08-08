import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChannelPageDetailsComponent } from './channel-page-details.component';

describe('ChannelPageDetailsComponent', () => {
  let component: ChannelPageDetailsComponent;
  let fixture: ComponentFixture<ChannelPageDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
