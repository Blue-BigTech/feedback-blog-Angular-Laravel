import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansBillingsRoutingModule } from './plans-billings-routing.module';
import { PlansBillingsComponent } from './plans-billings.component';
import { AllPlansComponent } from './all-plans/all-plans/all-plans.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

@NgModule({
  declarations: [
    PlansBillingsComponent,
    AllPlansComponent,
    PaymentHistoryComponent,
    PaymentMethodComponent,
  ],
  imports: [CommonModule, PlansBillingsRoutingModule, SharedModule],
  exports: [
    PlansBillingsComponent,
    AllPlansComponent,
    PaymentHistoryComponent,
    PaymentMethodComponent,
  ],
})
export class PlansBillingsModule {}
