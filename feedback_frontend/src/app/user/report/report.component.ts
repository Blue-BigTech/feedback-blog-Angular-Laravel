import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSelectService } from 'src/app/shared/services/user/user-select.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  selectedCompany: any;

  constructor(
    private route: ActivatedRoute,
    private selectService: UserSelectService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      //this.selectedCompany = data['id'];
      this.selectService.getCompanyDetails(data['id']).subscribe(data => {
        this.selectedCompany = data[0];
      });
    });
  }

}
