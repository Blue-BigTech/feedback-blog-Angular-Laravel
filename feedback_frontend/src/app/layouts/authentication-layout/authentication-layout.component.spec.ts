import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationLayoutComponent } from './authentication-layout.component';

describe('AuthenticationLayoutComponent', () => {
  let component: AuthenticationLayoutComponent;
  let fixture: ComponentFixture<AuthenticationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
