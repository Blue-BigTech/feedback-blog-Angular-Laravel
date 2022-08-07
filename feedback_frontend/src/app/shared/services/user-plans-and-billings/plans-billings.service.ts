import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlansBillingsService {
  smallAnnualPrice = 5;
  mediumAnnualPrice = 15;
  largeAnnualPrice = 30;

  smallMonthlyPrice = 7;
  mediumMonthlyPrice = 25;
  largeMonthlyPrice = 45;

  plansAnnualPeriod = 'per month, billed annually';
  plansMonthlyPeriod = 'per month';

  plansPeriod = this.plansAnnualPeriod;

  smallPrice = this.smallAnnualPrice;
  mediumPrice = this.mediumAnnualPrice;
  largePrice = this.largeAnnualPrice;

  currentPlan: string = 'Free';
  currentPlanPrice: number = this.smallAnnualPrice;

  constructor() {}
}
