import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import screenfull from 'screenfull';
import { User } from 'src/app/shared/models/User';
import { SelectedComponentRefreshService } from 'src/app/shared/refreshers/selected-component-refresh.service';
import { SplitAreaRefreshService } from 'src/app/shared/refreshers/split-area-refresh.service';
import { TabsService } from 'src/app/shared/refreshers/tabs.service';
import { ThemeService } from 'src/app/shared/refreshers/theme.service';
import { TopleftRefreshService } from 'src/app/shared/refreshers/topleft-refresh.service';
import { SingletonService } from 'src/app/shared/services/common/singleton.service';
import { DataCommentsService } from 'src/app/shared/services/data-comments.service';
import { PopupsServiceService } from 'src/app/shared/services/popups-service.service';
import { ProfileMenuService } from 'src/app/shared/services/profile-menu.service';
import { ThemeSwitcherService } from 'src/app/shared/services/theme-switcher.service';
import { TopleftComponentsService } from 'src/app/shared/services/topleft-components.service';
import { TemplateService } from 'src/app/shared/services/user/template.service';
import { UserDataService } from 'src/app/shared/services/user/user-data.service';
import { UserUpdateService } from 'src/app/shared/services/user/user-update.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
      });
    }
  }

  token: any = '';
  user: User = new User();

  chars: string = '';

  fullscreen: boolean = false;

  splitted: boolean = false;
  direction: string = 'vr';

  splitArea: any;

  selectedCompany: any = '';
  selectedLightTheme: any = 'atom-theme';
  selectedDarkTheme: any = 'atom-theme';
  selectedThemeMode: any = 'light';

  // temp variable for add active accent for topnavbar buttons
  activeTopNavbsrLink: string = 'charts';

  newsCollapsed: boolean = false;

  constructor(
    private userUpdateService: UserUpdateService,
    private templateService: TemplateService,
    private router: Router,
    private splitAreasRefresh: SplitAreaRefreshService,
    private selectedComponentRefresh: SelectedComponentRefreshService,
    private tabsRefresher: TabsService,
    private themeRefresher: ThemeService,
    private userdata: UserDataService,
    public serv: ProfileMenuService,
    public themeService: ThemeSwitcherService,
    public popupsService: PopupsServiceService,
    public topLeftComponentRefresher: TopleftRefreshService,
    private topleftComponentsService: TopleftComponentsService,
    public dataCommentService: DataCommentsService
  ) {}

  componentRouterLink: string = '';

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.componentRouterLink = localStorage.getItem('activeRouterLink') + '';
    this.userdata.getCurrentUser(this.token).subscribe((data) => {
      this.user = data;

      //console.log(this.user._id)

      this.chars = this.user.fname!.charAt(0) + this.user.lname!.charAt(0);
    });

    this.selectedCompany = localStorage.getItem('selected_company_id');
    if (localStorage.getItem('splitted') == 'true') {
      this.splitted = true;
    } else {
      this.splitted = false;
    }

    this.direction = localStorage.getItem('splitDirection') + '';

    this.selectedComponentRefresh.getMessage().subscribe((res) => {
      this.componentRouterLink = localStorage.getItem('activeRouterLink') + '';
    });

    this.selectedLightTheme = localStorage.getItem('activeLightTheme');
    this.selectedDarkTheme = localStorage.getItem('activeDarkTheme');
    this.selectedThemeMode = localStorage.getItem('themeMode');

    this.themeRefresher.getMessage().subscribe((res) => {
      this.selectedLightTheme = localStorage.getItem('activeLightTheme');
      this.selectedDarkTheme = localStorage.getItem('activeDarkTheme');
      this.selectedThemeMode = localStorage.getItem('themeMode');
    });
  }

  // showBasicDialog() {
  //   this.popupsService.displayFeedbackPopup =
  //     !this.popupsService.displayFeedbackPopup;

  //   this.popupsService.displayProfilePopup = false;
  // }

  openFeedbackWindow(): void {
    this.popupsService.visibleFeedbackWindow =
      !this.popupsService.visibleFeedbackWindow;

    if (!this.dataCommentService.allCommentsVisible) {
      this.dataCommentService.allCommentsVisible = true;
    }

    this.popupsService.visibleProfileWindow = false;
    this.dataCommentService.loadFeedbacks(1);
    this.dataCommentService.getNotify();
  }

  onMenuClick(btnID: string): void {
    this.serv.activeProfileButton = btnID;
  }

  setSelectedRouterLink(link: string) {
    // temp code from Yurii --------------
    this.activeTopNavbsrLink = link;
    // ------------------------------

    let id = localStorage.getItem('selectedPane');
    let tab_id = localStorage.getItem('selected_Tab') + '';
    this.templateService.getSplitArea(tab_id).subscribe((res) => {
      this.splitArea = res[0];
      this.splitArea.columns.forEach((col: any) => {
        col.rows.forEach((row: any) => {
          if (row.paneIdent == id) {
            row.routerLink = link;
            row.company_id = localStorage.getItem('selected_company_id');
            this.userUpdateService
              .updateTabSplits(this.splitArea)
              .subscribe((res) => {
                this.splitAreasRefresh.setMessage('split the area');
                this.componentRouterLink = link;
                localStorage.setItem('activeRouterLink', link);
              });
          }
        });
      });
    });
  }

  navigateTo(link: string) {
    localStorage.setItem('routerOutlet', 'true');
    this.router.navigate(['/us/', link]);
    this.tabsRefresher.setMessage('navigation');
  }

  // for theme-switcher-button
  // public themeService: ThemeSwitcherService - service access variable
  switchThemeMode() {
    this.themeService.themeMode =
      this.themeService.themeMode === 'light' ? 'dark' : 'light';

    localStorage.setItem('themeMode', this.themeService.themeMode);

    /*if (this.themeService.themeMode === 'light') {
      this.themeService.selectedTheme = this.themeService.activeLightTheme;
      localStorage.setItem(
        'selected-theme',
        this.themeService.activeLightTheme
      );
    } else if (this.themeService.themeMode === 'dark') {
      this.themeService.selectedTheme = this.themeService.activeDarkTheme;
      localStorage.setItem('selected-theme', this.themeService.activeDarkTheme);
    }*/
    this.themeRefresher.setMessage('theme changes');
  }

  fullScreen() {
    if (screenfull.isEnabled) {
      screenfull.request();
      this.fullscreen = true;
    }
    if (screenfull.isFullscreen) {
      screenfull.exit();
      this.fullscreen = false;
    }
  }

  // line under active tab in popup
  underLinkLinePosition: any;
  underLinkLineWidth: any;
  underLine(e: any): void {
    const navItem = e.target.closest('.popup-nav-menu__item');

    this.underLinkLineWidth = navItem.offsetWidth + 'px';
    this.underLinkLinePosition = navItem.offsetLeft + 'px';
  }

  // updates 13 July DISCORD view
  selectedTopRightMenuItem: string = '';
  openLeftSidePanel: boolean = false;

  /*openSidePanel(item: string) {
    if (this.selectedTopRightMenuItem === '') {
      this.openLeftSidePanel = true;
      this.topleftComponentsService.openSidePanel = true;
      this.topLeftComponentRefresher.setMessage('');
    }

    if (item === this.selectedTopRightMenuItem) {
      this.selectedTopRightMenuItem = '';
      this.openLeftSidePanel = false;
      this.topleftComponentsService.openSidePanel = false;
      this.topleftComponentsService.selectedComponent = '';
      this.topLeftComponentRefresher.setMessage('');
    } else {
      this.selectedTopRightMenuItem = item;
      this.topleftComponentsService.selectedComponent = item;
      this.topLeftComponentRefresher.setMessage('');
    }
  }*/

  openNewsPanel() {
    if (this.newsCollapsed) {
      this.newsCollapsed = false;
      this.topleftComponentsService.openNewsPanel = this.newsCollapsed;
      this.topLeftComponentRefresher.setMessage('');
      this.selectedTopRightMenuItem = '';
    } else {
      this.newsCollapsed = true;
      this.topleftComponentsService.openNewsPanel = this.newsCollapsed;
      this.topLeftComponentRefresher.setMessage('');
      this.selectedTopRightMenuItem = 'news';
    }
  }
}
