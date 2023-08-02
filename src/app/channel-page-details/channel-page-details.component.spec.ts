import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPageDetailsComponent } from './channel-page-details.component';

describe('ChannelPageDetailsComponent', () => {
  let component: ChannelPageDetailsComponent;
  let fixture: ComponentFixture<ChannelPageDetailsComponent>;

  beforeEach(async(() => {
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
