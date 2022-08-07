import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceLocalstorageComponent } from './workspace-localstorage.component';

describe('WorkspaceLocalstorageComponent', () => {
  let component: WorkspaceLocalstorageComponent;
  let fixture: ComponentFixture<WorkspaceLocalstorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceLocalstorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceLocalstorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
