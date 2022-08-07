import { Component, OnInit } from '@angular/core';
import { UserSelectService } from 'src/app/shared/services/user/user-select.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  api = environment.api;

  components: any[] = [];
  selectedCompanie: any;
  selectedFeature: string = '';
  featuredetails: any[] = [];

  companies: any[] = [];

  test1 = {
    "name": "test",
    "description": "test",
    "test": {
      "test": "test",
      "test2": "test2"
    }
  }

  test2: any;

  constructor(
    private userSelect: UserSelectService,
  ) { }

  ngOnInit(): void {
    /*this.userSelect.getFeatures().subscribe(data => {
      this.components = data;
      this.selectedComponent = this.components[0];
      this.selectedFeature = this.components[0]._id.$oid;
      this.userSelect.getFeaturesDetails(this.selectedFeature).subscribe(data => {
        this.featuredetails = data;
      })
    })*/
    this.userSelect.getCompanies().subscribe(data => {
      this.companies = data;
      this.selectedCompanie = this.companies[0];
    });
  }

  test(id: any) {
    console.log(id);
  }

  /*displayDetails(id: any) {
    this.selectedFeature = id;
    this.selectedComponent = this.components.find(x => x._id.$oid === id);
    this.userSelect.getFeaturesDetails(id).subscribe(data => {
      this.featuredetails = data;
      console.log(data);
    })
  }*/
  displayDetails(id: any) {
    this.selectedCompanie = this.companies.find(x => x._id.$oid === id);
  }

}
