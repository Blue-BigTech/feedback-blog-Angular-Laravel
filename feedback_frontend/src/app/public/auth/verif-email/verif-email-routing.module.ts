import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifEmailComponent } from './verif-email.component';

const routes: Routes = [{ path: '', component: VerifEmailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifEmailRoutingModule { }
