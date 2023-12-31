import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImageGalaryComponent } from './image-galary.component';

describe('ImageGalaryComponent', () => {
  let component: ImageGalaryComponent;
  let fixture: ComponentFixture<ImageGalaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageGalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
