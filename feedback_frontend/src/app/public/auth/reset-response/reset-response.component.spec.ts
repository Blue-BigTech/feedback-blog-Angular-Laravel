import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetResponseComponent } from './reset-response.component';

describe('ResetResponseComponent', () => {
  let component: ResetResponseComponent;
  let fixture: ComponentFixture<ResetResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
