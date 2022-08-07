import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackWindowComponent } from './feedback-window.component';

describe('FeedbackWindowComponent', () => {
  let component: FeedbackWindowComponent;
  let fixture: ComponentFixture<FeedbackWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
