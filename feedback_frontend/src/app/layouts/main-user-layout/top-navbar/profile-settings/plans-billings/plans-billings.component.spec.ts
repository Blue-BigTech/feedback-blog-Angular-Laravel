import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansBillingsComponent } from './plans-billings.component';

describe('PlansBillingsComponent', () => {
  let component: PlansBillingsComponent;
  let fixture: ComponentFixture<PlansBillingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansBillingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
