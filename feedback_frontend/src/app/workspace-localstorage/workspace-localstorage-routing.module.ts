import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceLocalstorageComponent } from './workspace-localstorage.component';

const routes: Routes = [{ path: '', component: WorkspaceLocalstorageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceLocalstorageRoutingModule { }
