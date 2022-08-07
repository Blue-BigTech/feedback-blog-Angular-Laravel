import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import screenfull from 'screenfull';
import { UserSelectService } from 'src/app/shared/services/user/user-select.service';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  selectedTheme: any = 'default-theme';
  selectedCompany: any = '';

  fullscreen: boolean = false;
  changeThemeDialog: boolean = false;

  collapseLeftBox: boolean = false;
  collapseRightBox: boolean = false;

  companies: any[] = [];
  splitterDirection: boolean = false;

  firstSize: number = 50;
  secondSize: number = 50;

  constructor(
    private userSelect: UserSelectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('selected-theme');
    this.selectedCompany = localStorage.getItem('selected_company_id');

    this.userSelect.getCompanies().subscribe(data => {
      this.companies = data;
    });


    let direction = localStorage.getItem('splitDirection');
    if(direction == null || direction == undefined || direction == '') {
      localStorage.setItem('splitDirection', 'horizontal');
      this.splitterDirection = false;
    } else if(direction == 'vertical') {
      this.splitterDirection = true;
    } else if(direction == 'horizontal') {
      this.splitterDirection = false;
    }
  }

  change(theme: any) {
    localStorage.setItem('theme', theme);
    this.selectedTheme = localStorage.getItem('theme')
  }

  changeTheme() {
    if(!this.changeThemeDialog) {
      this.changeThemeDialog = true;
    } else {
      this.changeThemeDialog = false;
    }
  }
  ClosechangeTheme() {
    this.changeThemeDialog = false;
  }



  getCompany(id: any) {
    //alert(id);
    localStorage.setItem('selected_company_id', id);
    this.selectedCompany = id;
    this.router.navigateByUrl('/us/dashboard/'+id);
  }




  fullScreen() {
    if(screenfull.isEnabled) {
      screenfull.request();
      this.fullscreen = true;
    }
    if(screenfull.isFullscreen) {
      screenfull.exit();
      this.fullscreen = false;
    }
  }

  collapseLeft() {
    if(!this.collapseLeftBox) {
      this.collapseLeftBox = true;
    } else {
      this.collapseLeftBox = false;
    }
  }
  collapseRight() {
    if(!this.collapseRightBox) {
      this.collapseRightBox = true;
    } else {
      this.collapseRightBox = false;
    }
  }

  changeDirection() {
    if(this.splitterDirection) {//Horizontal
      this.splitterDirection = false;
      localStorage.setItem('splitDirection', 'horizontal');
    } else { //Vertical
      this.splitterDirection = true;
      localStorage.setItem('splitDirection', 'vertical');
    }
  }

  resizeFirstArea(event: ResizedEvent) {
    this.firstSize = event.newRect.width;
    //this.Fheight = event.newRect.height;
    console.log(this.firstSize)
  }
  resizeSecondArea(event: ResizedEvent) {
    this.secondSize = event.newRect.width;
    //this.Sheight = event.newRect.height;
  }

  detectSplitArea(splitarea: string) {
    localStorage.setItem('splitarea', splitarea);
    console.log(splitarea)
  }

  dropDownBTN() {

  }

}
