import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifEmailComponent } from './verif-email.component';

describe('VerifEmailComponent', () => {
  let component: VerifEmailComponent;
  let fixture: ComponentFixture<VerifEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
