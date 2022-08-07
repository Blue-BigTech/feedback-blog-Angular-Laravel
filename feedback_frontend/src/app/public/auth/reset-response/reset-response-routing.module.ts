import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetResponseComponent } from './reset-response.component';

const routes: Routes = [{ path: '', component: ResetResponseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetResponseRoutingModule { }
