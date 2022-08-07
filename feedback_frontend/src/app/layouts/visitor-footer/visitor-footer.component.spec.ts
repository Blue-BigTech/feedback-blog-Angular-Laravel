import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorFooterComponent } from './visitor-footer.component';

describe('VisitorFooterComponent', () => {
  let component: VisitorFooterComponent;
  let fixture: ComponentFixture<VisitorFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
