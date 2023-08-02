import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalTemplateComponent } from './normal-template.component';

describe('NormalTemplateComponent', () => {
  let component: NormalTemplateComponent;
  let fixture: ComponentFixture<NormalTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
