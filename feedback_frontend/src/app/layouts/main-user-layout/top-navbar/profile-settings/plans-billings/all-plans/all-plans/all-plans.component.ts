import { Component, OnInit } from '@angular/core';
import { ProfileMenuService } from 'src/app/shared/services/profile-menu.service';
import { PlansBillingsService } from 'src/app/shared/services/user-plans-and-billings/plans-billings.service';

@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss'],
})
export class AllPlansComponent implements OnInit {
  tooltip: string = 'Save up to X% when with an annual plan';

  smallAnnualPrice = this.plansService.smallAnnualPrice;
  mediumAnnualPrice = this.plansService.mediumAnnualPrice;
  largeAnnualPrice = this.plansService.largeAnnualPrice;

  smallMonthlyPrice = this.plansService.smallMonthlyPrice;
  mediumMonthlyPrice = this.plansService.mediumMonthlyPrice;
  largeMonthlyPrice = this.plansService.largeMonthlyPrice;

  plansAnnualPeriod = this.plansService.plansAnnualPeriod;
  plansMonthlyPeriod = this.plansService.plansMonthlyPeriod;

  plansPeriod = this.plansAnnualPeriod;

  smallPrice = this.smallAnnualPrice;
  mediumPrice = this.mediumAnnualPrice;
  largePrice = this.largeAnnualPrice;

  constructor(
    public plansService: PlansBillingsService,
    public serv: ProfileMenuService
  ) {}

  ngOnInit(): void {}

  changePeriod(e: any): void {
    if (e.target.checked) {
      this.smallPrice = this.smallMonthlyPrice;
      this.mediumPrice = this.mediumMonthlyPrice;
      this.largePrice = this.largeMonthlyPrice;

      this.plansPeriod = this.plansMonthlyPeriod;
    } else if (!e.target.checked) {
      this.smallPrice = this.smallAnnualPrice;
      this.mediumPrice = this.mediumAnnualPrice;
      this.largePrice = this.largeAnnualPrice;

      this.plansPeriod = this.plansAnnualPeriod;
    }
  }

  returnToBillings(): void {
    this.serv.activeProfileButton = 'plans-billings';
  }
}
