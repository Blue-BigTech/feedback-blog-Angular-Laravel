import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ProfileRefreshService } from 'src/app/shared/refreshers/profile-refresh.service';
import { SplitAreaRefreshService } from 'src/app/shared/refreshers/split-area-refresh.service';
import { ThemeService } from 'src/app/shared/refreshers/theme.service';
import { TopleftRefreshService } from 'src/app/shared/refreshers/topleft-refresh.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TokenService } from 'src/app/shared/services/auth/token.service';
import { PopupsServiceService } from 'src/app/shared/services/popups-service.service';
import { ProfileMenuService } from 'src/app/shared/services/profile-menu.service';
import { ThemeSwitcherService } from 'src/app/shared/services/theme-switcher.service';
import { TopleftComponentsService } from 'src/app/shared/services/topleft-components.service';
import { TemplateService } from 'src/app/shared/services/user/template.service';
import { UserDataService } from 'src/app/shared/services/user/user-data.service';
import { UserSelectService } from 'src/app/shared/services/user/user-select.service';
import { UserUpdateService } from 'src/app/shared/services/user/user-update.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {

  filepath = environment.filepathstorage;

  token: any = '';
  user: User = new User();
  chars: string = '';

  selectedCompany: any = '';
  companies: any[] = [];
  selectedLightTheme: any = 'atom-theme';
  selectedDarkTheme: any = 'atom-theme';
  selectedThemeMode: any = 'light';

  underLinkLineWidth: any = '110px';
  underLinkLinePosition: any = '0px';

  openSidePanel: boolean = false;
  selectedSidePanelComponent: string = '';

  switchArea: boolean = false;
  splitAreaComponents: any;

  constructor(
    private userSelect: UserSelectService,
    private router: Router,
    private themeRefresher: ThemeService,
    private userdata: UserDataService,
    public serv: ProfileMenuService,
    public themeService: ThemeSwitcherService,
    private profilerefresh: ProfileRefreshService,
    public popupsService: PopupsServiceService,
    private topleftComponentsService: TopleftComponentsService,
    private topleftRefreshService: TopleftRefreshService,
    private Auth: AuthService,
    private tokenService: TokenService,
    private templateService: TemplateService,
    private updateService: UserUpdateService,
    private splitAreasRefresh: SplitAreaRefreshService,
  ) {}

  ngOnInit(): void {
    this.selectedLightTheme = localStorage.getItem('activeLightTheme');
    this.selectedDarkTheme = localStorage.getItem('activeDarkTheme');
    this.selectedThemeMode = localStorage.getItem('themeMode');

    this.token = localStorage.getItem('token');
    this.userdata.getCurrentUser(this.token).subscribe((data) => {
      this.user = data;
    });

    this.profilerefresh.getMessage().subscribe((res) => {
      this.userdata.getCurrentUser(this.token).subscribe((data) => {
        this.user = data;
      });
    });

    this.themeRefresher.getMessage().subscribe((res) => {
      this.selectedLightTheme = localStorage.getItem('activeLightTheme');
      this.selectedDarkTheme = localStorage.getItem('activeDarkTheme');
      this.selectedThemeMode = localStorage.getItem('themeMode');
    });

    this.selectedCompany = localStorage.getItem('selected_company_id');
    this.userSelect.getCompanies().subscribe((data) => {
      this.companies = data;
    });

    this.topleftRefreshService.getMessage().subscribe((res) => {
      this.openSidePanel = this.topleftComponentsService.openSidePanel;
      this.selectedSidePanelComponent =
        this.topleftComponentsService.selectedComponent;
      if (this.openSidePanel) {
      }
    });
  }

  setCompany(id: string) {
    let paneId = localStorage.getItem('selectedPane');
    let tab_id = localStorage.getItem('selected_Tab') + '';
    this.templateService.getSplitArea(tab_id).subscribe(res => {
      this.splitAreaComponents = res[0];
      this.splitAreaComponents.columns.forEach((col: any) => {
        col.rows.forEach((row: any) => {
          if(row.paneIdent === paneId) {
            row.company_id = id;
            this.updateService.updateTabSplits(this.splitAreaComponents).subscribe((res: any) => {
              localStorage.setItem('selected_company_id', id);
              this.selectedCompany = id;
              this.splitAreasRefresh.setMessage('split the area');
            })
          }
        })
      })
    })

  }

  showBasicDialog(btnID: any, e: any) {
    this.serv.activeProfileButton = btnID;
    /*const navItem = e.target.closest('.profile-menu__item');

    this.underLinkLineWidth = navItem.offsetWidth + 'px';
    this.underLinkLinePosition = navItem.offsetLeft + 'px';*/
    this.popupsService.displayProfilePopup = true;
    this.popupsService.displayFeedbackPopup = false;
  }

  onMenuClick(e: any, btnID: string): void {
    this.serv.activeProfileButton = btnID;

    // this.underLinkLineWidth = e.target.offsetWidth + 'px';
    // this.underLinkLinePosition = e.target.offsetLeft + 'px';
  }

  underLine(e: any): void {
    const navItem = e.target.closest('.popup-nav-menu__item');

    this.underLinkLineWidth = navItem.offsetWidth + 'px';
    this.underLinkLinePosition = navItem.offsetLeft + 'px';
  }

  signOut(event: MouseEvent) {
    event.preventDefault();
    this.tokenService.removeToken();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/');
  }

  onSwitchArea() {
    console.log('oooooooooo');
    console.log(this.switchArea);
    if (!this.switchArea) {
      this.topleftComponentsService.openSidePanel = true;
      this.topleftRefreshService.setMessage('');
      this.switchArea = true;
    } else {
      this.topleftComponentsService.openSidePanel = false;
      this.topleftRefreshService.setMessage('');
      this.switchArea = false;
    }
  }

  openProfileWindow(): void {
    this.popupsService.visibleProfileWindow =
      !this.popupsService.visibleProfileWindow;

    this.popupsService.visibleFeedbackWindow = false;
  }
}
