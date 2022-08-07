import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceLocalstorageRoutingModule } from './workspace-localstorage-routing.module';
import { WorkspaceLocalstorageComponent } from './workspace-localstorage.component';

import { AngularSplitModule } from "angular-split";

@NgModule({
  declarations: [
    WorkspaceLocalstorageComponent
  ],
  imports: [
    CommonModule,
    WorkspaceLocalstorageRoutingModule,
    AngularSplitModule
  ]
})
export class WorkspaceLocalstorageModule { }
