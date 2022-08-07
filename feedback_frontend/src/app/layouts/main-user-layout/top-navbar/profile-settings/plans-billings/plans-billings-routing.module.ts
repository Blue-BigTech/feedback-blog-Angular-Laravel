import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansBillingsComponent } from './plans-billings.component';

const routes: Routes = [{ path: '', component: PlansBillingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansBillingsRoutingModule { }
