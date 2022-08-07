import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplittedAreaComponent } from './splitted-area.component';

describe('SplittedAreaComponent', () => {
  let component: SplittedAreaComponent;
  let fixture: ComponentFixture<SplittedAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplittedAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplittedAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
