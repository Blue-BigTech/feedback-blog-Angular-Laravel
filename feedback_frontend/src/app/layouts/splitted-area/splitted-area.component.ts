import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Refresh1Service } from 'src/app/shared/refreshers/refresh1.service';
import { SingletonService } from 'src/app/shared/services/common/singleton.service';
import { TemplateService } from 'src/app/shared/services/user/template.service';
import screenfull from 'screenfull';
import { UserUpdateService } from 'src/app/shared/services/user/user-update.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { SplitAreaRefreshService } from 'src/app/shared/refreshers/split-area-refresh.service';
import { SelectedComponentRefreshService } from 'src/app/shared/refreshers/selected-component-refresh.service';
import { TabsService } from 'src/app/shared/refreshers/tabs.service';
import { UserDeleteService } from 'src/app/shared/services/user/user-delete.service';
import { ThemeService } from 'src/app/shared/refreshers/theme.service';
import { User } from 'src/app/shared/models/User';
import { UserDataService } from 'src/app/shared/services/user/user-data.service';
import { UserSelectService } from 'src/app/shared/services/user/user-select.service';
import { environment } from 'src/environments/environment';
import { Spinkit } from 'ng-http-loader';

interface IConfig {
  tab_id: string;
  user_id: string;
  columns: Array<{
    size: number;
    rows: Array<{
      paneIdent: string;
      size: number;
      routerLink: string;
      company_id: string;
    }>;
  }>;
}

interface ActHistory {
  user_id: string;
  session: string;
  actions: Array<{
    date: string;
    action: string;
    model: string;
    item_id: string;
    action_reverse: string;
    index: number;
  }>;
}

const actionHistory: ActHistory = {
  session: new Date().toISOString(),
  user_id: '',
  actions: [
    {
      date: '',
      action: 'init',
      model: '',
      item_id: '',
      action_reverse: 'init',
      index: 1,
    },
  ],
};

const defaultConfig: IConfig = {
  tab_id: '',
  user_id: '',
  columns: [
    {
      size: 100,
      rows: [
        {
          paneIdent: '',
          size: 100,
          routerLink: 'charts',
          company_id: '',
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-splitted-area',
  templateUrl: './splitted-area.component.html',
  styleUrls: ['./splitted-area.component.scss']
})
export class SplittedAreaComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closedeleteactbutton') closedeleteactbutton: any;

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'ArrowRight' || event.key == 'ArrowLeft') {
      if (event.key == 'ArrowRight' && this.currentTab < this.tabs.length - 1) {
        this.currentTab++;
        this.activeTab = this.tabs[this.currentTab]._id.$oid;
        this.templateService.getSplitArea(this.activeTab).subscribe((res) => {
          this.tabAreaData = res[0];
          this.columns = res[0].columns;
          localStorage.setItem(
            'activeRouterLink',
            this.columns[0].rows[0].routerLink
          );
          this.selectedComponentRefresh.setMessage('pane selected');
        });
      } else if (event.key == 'ArrowLeft' && this.currentTab > 0) {
        this.currentTab--;
        this.activeTab = this.tabs[this.currentTab]._id.$oid;
        this.templateService.getSplitArea(this.activeTab).subscribe((res) => {
          this.tabAreaData = res[0];
          this.columns = res[0].columns;
          localStorage.setItem(
            'activeRouterLink',
            this.columns[0].rows[0].routerLink
          );
          this.selectedComponentRefresh.setMessage('pane selected');
        });
      }
    } else {
    }

    if (event.key == 'Escape') {
      this.fullscreen = false;
    }
  }

  public spinkit = Spinkit;

  filepath = environment.filepathstorage;

  token: any = '';
  user: User = new User();
  current_user_id: any;
  selectedLightTheme: any = 'atom-theme';
  selectedDarkTheme: any = 'atom-theme';
  selectedThemeMode: any = 'light';

  sessionStorageData: any;

  UserActionsHistory: any[] = [];
  nextaction: number = 0;
  prevaction: number = 0;
  actionIndex: number = 0;

  fullscreen: boolean = false;
  initSplitter: boolean = false;
  auxForInitSplit: number = 0;

  updatedName: string = '';
  updateTabName: boolean = false;
  UpdatedTabId: string = '';
  selectedTab: any;

  direction: string = 'vr';

  mainArea: any[] = [];
  selectedPaneId: string = '';

  tabs: any[] = [];
  tabsLength: number = 0;
  activeTab: string = '';
  tabsids: any[] = [];
  currentTab: number = 0;

  splitterDirection: boolean = false;
  splitted: boolean = false;
  screenWidth: number = 0;
  screenHeight: number = 0;

  firstSize: number = 50;
  secondSize: number = 50;

  initialized: boolean = false;

  selectedPane: string = '';

  first: string = '';
  second: string = '';

  addingTab: boolean = false;

  newTabForm!: FormGroup;

  componentRouterLink: string = '';

  public initSplitForm: any;

  config: any;
  localStorageName = 'angular-split-ws';
  tabAreaData: any;
  columns: any[] = [];

  splitAreaComponents: any;

  currentCompany: any;

  constructor(
    private splitService: SingletonService,
    private templateService: TemplateService,
    private refresh1: Refresh1Service,
    private updateService: UserUpdateService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private splitAreasRefresh: SplitAreaRefreshService,
    private selectedComponentRefresh: SelectedComponentRefreshService,
    private tabsRefresher: TabsService,
    private userDelete: UserDeleteService,
    private themeRefresher: ThemeService,
    private userdata: UserDataService,
    private selectservice: UserSelectService
  ) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  saveLocalStorage() {
    localStorage.setItem(this.localStorageName, JSON.stringify(this.config));
  }

  ngOnInit(): void {

    if(localStorage.getItem('selected_company_id') !== undefined || localStorage.getItem('selected_company_id') !== null) {
      this.selectservice.getCompanyDetails(localStorage.getItem('selected_company_id')+'').subscribe(res => {
        this.currentCompany = res[0];
        //console.log(this.currentCompany);
      })
    }




    this.token = localStorage.getItem('token');
    this.componentRouterLink = localStorage.getItem('activeRouterLink') + '';

    this.userdata.getCurrentUser(this.token).subscribe((data) => {
      this.user = data;
      this.current_user_id = this.user._id;

      this.templateService
        .getUserTemplateTabs(this.user._id!)
        .subscribe((res) => {
          this.tabs = res;

          this.tabsids = [];
          this.tabs.filter((x) => {
            this.tabsids.push(x._id.$oid);
          });

          this.tabsLength = this.tabs.length;

          if (this.tabs.length) {
            this.activeTab = localStorage.getItem('selected_Tab') + '';
            this.templateService
              .getSplitArea(this.activeTab)
              .subscribe((res) => {
                this.tabAreaData = res[0];
                this.columns = res[0].columns;

                /* TO ADD 1 EXTRA FOR THE LAST COLUMN */
                if (this.columns.length == 2) {
                  this.columns[0].size = 100 - Math.floor(this.columns[1].size);
                  this.columns[1].size = Math.floor(this.columns[1].size);
                } else if (this.columns.length == 3) {
                  this.columns[0].size =
                    100 -
                    (Math.floor(this.columns[1].size) +
                      Math.floor(this.columns[2].size));
                  this.columns[1].size = Math.floor(this.columns[1].size);
                  this.columns[2].size = Math.floor(this.columns[2].size);
                }
              });
          }
        });
    });

    if (!localStorage.getItem('selected-theme')) {
      localStorage.setItem('selected-theme', 'atom-theme');
    }
    if (!localStorage.getItem('activeLightTheme')) {
      localStorage.setItem('activeLightTheme', 'atom-theme');
    }
    if (!localStorage.getItem('activeDarkTheme')) {
      localStorage.setItem('activeDarkTheme', 'atom-theme');
    }
    if (!localStorage.getItem('themeMode')) {
      localStorage.setItem('themeMode', 'dark');
    }
    if (!localStorage.getItem('typeWorkspace')) {
      localStorage.setItem('typeWorkspace', 'Student');
    }

    this.themeRefresher.getMessage().subscribe((res) => {
      this.selectedLightTheme = localStorage.getItem('activeLightTheme');
      this.selectedDarkTheme = localStorage.getItem('activeDarkTheme');
      this.selectedThemeMode = localStorage.getItem('themeMode');
    });

    //indexes for undo-redo actions - to disable buttons and to know user in which index to move next or prev
    this.actionIndex = sessionStorage.getItem('actionIndex')
      ? parseInt(sessionStorage.getItem('actionIndex') + '')
      : 0;
    this.nextaction = this.actionIndex;
    this.prevaction = this.actionIndex;
    //alert(this.actionIndex+'------'+this.nextaction+'------'+this.prevaction);

    this.selectedLightTheme = localStorage.getItem('activeLightTheme');
    this.selectedDarkTheme = localStorage.getItem('activeDarkTheme');
    this.selectedThemeMode = localStorage.getItem('themeMode');
    //set the today session for the history actions
    this.sessionStorageData = sessionStorage.getItem('actionHistory');
    if (this.sessionStorageData) {
      let x = JSON.parse(this.sessionStorageData);
      //let today = new Date();
      const [today] = new Date().toISOString().split('T');
      const [sessionday] = x.session.split('T');
      if (today !== sessionday) {
        x.session = new Date().toISOString();
        sessionStorage.setItem('actionHistory', JSON.stringify(actionHistory));
        sessionStorage.setItem('actionIndex', '1');
      } else {
      }
    } else {
      sessionStorage.setItem('actionHistory', JSON.stringify(actionHistory));
      sessionStorage.setItem('actionIndex', '1');
    }

    this.newTabForm = new FormGroup({
      status: new FormControl(true),
      user_id: new FormControl(''),
      name: new FormControl('', Validators.required),
      order: new FormControl(0),
    });

    this.selectedPaneId = localStorage.getItem('selectedPane') + '';

    this.templateService.getActionHistory('1').subscribe((res) => {
      this.UserActionsHistory = res[0].actions;
      //this.nextaction = this.UserActionsHistory.length;
      //this.prevaction = 1;
    });

    this.refresh1.getMessage().subscribe((ref) => {
      this.templateService
        .getUserTemplateTabs(this.current_user_id)
        .subscribe((res) => {
          this.tabs = res;

          this.tabsids = [];
          this.tabs.filter((x) => {
            this.tabsids.push(x._id.$oid);
          });
        });
    });

    this.tabsRefresher.getMessage().subscribe((ref) => {
      this.activeTab = '';
    });

    this.splitAreasRefresh.getMessage().subscribe((res) => {
      this.templateService.getSplitArea(this.activeTab).subscribe((res) => {
        this.tabAreaData = res[0];
        this.columns = res[0].columns;
      });
    });

    this.splitAreasRefresh.getMessage().subscribe(res => {
      this.selectservice.getCompanyDetails(localStorage.getItem('selected_company_id')+'').subscribe(res => {
        this.currentCompany = res[0];
      });
    });

    this.selectedComponentRefresh.getMessage().subscribe((res) => {
      this.componentRouterLink = localStorage.getItem('activeRouterLink') + '';
    });
  }

  getSplitStatus() {
    if (localStorage.getItem('splitted') == 'true') {
      this.splitted = true;
    } else if (localStorage.getItem('splitted') == 'false') {
      this.splitted = false;
    }
  }
  getSplitDirection() {
    if (localStorage.getItem('splitDirection') == 'vr') {
      this.splitterDirection = true;
    } else {
      this.splitterDirection = false;
    }
  }
  getWindowsSizes() {}

  detectSplitArea(splitarea: string) {
    localStorage.setItem('splitarea', splitarea);
    this.selectedPane = splitarea;
  }

  addNewTab() {
    this.addingTab = true;
  }
  cancelAddTab() {
    this.addingTab = false;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.warn('deleted');
        },
        (reason) => {
          console.warn('dismissed');
        }
      );
  }

  deleteTab(modal: any, id: any) {
    this.templateService.deleteTemplateTab(id).subscribe((res) => {
      this.refresh1.setMessage('tab deleted');
    });
    modal.close('Save click');
  }

  storeNewTab() {
    this.newTabForm.value.user_id = this.user._id;
    this.newTabForm.value.order = this.tabs.length + 1;
    this.newTabForm.value.status = true;

    actionHistory.user_id = this.user._id;
    actionHistory.actions[0].model = 'templateTabs';
    actionHistory.actions[0].date = new Date().toString();

    this.templateService
      .CreateTemplateTab(this.newTabForm.value)
      .subscribe((res) => {
        actionHistory.actions[0].item_id = res._id;

        this.sessionStorageData = sessionStorage.getItem('actionHistory');
        let sessiondata = JSON.parse(this.sessionStorageData);
        //let today = new Date();
        const [today] = new Date().toISOString().split('T');
        const [sessionday] = sessiondata.session.split('T');
        if (today !== sessionday) {
          sessiondata.session = new Date().toISOString();
          sessionStorage.setItem(
            'actionHistory',
            JSON.stringify(actionHistory)
          );
        } else {
          let l = sessiondata.actions.length;
          sessiondata.actions.push({
            date: new Date().toISOString(),
            action: 'create',
            model: 'templateTabs',
            item_id: res._id,
            action_reverse: 'delete',
            index: l + 1,
          });
          this.sessionStorageData = sessiondata;
          sessionStorage.setItem(
            'actionHistory',
            JSON.stringify(this.sessionStorageData)
          );
          sessionStorage.setItem(
            'actionIndex',
            JSON.parse(
              sessionStorage.getItem('actionHistory')!
            ).actions.length.toString()
          );
        }

        let x = localStorage.getItem('actionHistory');

        this.newTabForm.reset();
        this.refresh1.setMessage('new tab added');
        let paneIdent = '';
        const chars =
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const l = 24;
        let randomstring = '';
        for (let i = 0; i < l; i++) {
          const rnum = Math.floor(Math.random() * chars.length);
          randomstring = randomstring + chars.substring(rnum, rnum + 1);
        }

        paneIdent = paneIdent + randomstring;

        defaultConfig.columns[0].rows[0].paneIdent = paneIdent;
        defaultConfig.tab_id = res._id;
        defaultConfig.user_id = res.user_id;

        this.initSplitForm = defaultConfig;

        this.templateService
          .initSplitArea(this.initSplitForm)
          .subscribe((resp) => {});
      });
  }

  openTopTab(event: any, id: any) {
    this.tabsids = [];
    this.tabs.filter((x) => {
      this.tabsids.push(x._id.$oid);
    });
    this.activeTab = id;
    localStorage.setItem('selected_Tab', this.activeTab);
    this.currentTab = this.tabsids.indexOf(this.activeTab);
    this.templateService.getSplitArea(id).subscribe((res) => {
      this.tabAreaData = res[0];
      this.columns = res[0].columns;
      this.selectedPaneId = this.columns[0].rows[0].paneIdent;
      localStorage.setItem(
        'activeRouterLink',
        this.columns[0].rows[0].routerLink
      );
      this.selectedComponentRefresh.setMessage('pane selected');
    });
  }

  nextPrevTab(event: any, id: any, direction: string) {
    this.tabsids = [];
    this.tabs.filter((x) => {
      this.tabsids.push(x._id.$oid);
    });

    this.currentTab = this.tabsids.indexOf(this.activeTab);

    if (direction == 'next' && this.currentTab != this.tabsids.length - 1) {
      this.activeTab = this.tabsids[this.currentTab + 1];
      this.currentTab = this.tabsids.indexOf(this.activeTab);
      this.templateService.getSplitArea(this.activeTab).subscribe((res) => {
        this.mainArea = res[0].panes;
      });
    } else if (direction == 'prev' && this.currentTab != 0) {
      this.activeTab = this.tabsids[this.currentTab - 1];
      this.currentTab = this.tabsids.indexOf(this.activeTab);
      this.templateService.getSplitArea(this.activeTab).subscribe((res) => {
        this.mainArea = res[0].panes;
      });
    }
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

  openUpdate(id: string) {
    this.activeTab = id;
    this.UpdatedTabId = id;
    this.updateTabName = true;

    const n = this.tabs.filter((x) => {
      if (x._id.$oid == id) {
        this.selectedTab = x;
        this.updatedName = this.selectedTab.name;
      }
    });
  }

  saveTabNameUpdate(id: string) {
    this.updateService.updateTabName(id, this.updatedName).subscribe((res) => {
      this.updateTabName = false;
      this.refresh1.setMessage('tab name updated');
    });
  }

  updateTabOrder(id: string, order: number) {
    this.updateService.updateTabOrder(id, order).subscribe((res) => {});
  }

  selectPane(id: any) {
    localStorage.setItem('selectedPane', id);
    this.selectedPaneId = id;

    this.columns.forEach((element) => {
      element.rows.forEach((row: any) => {
        if (row.paneIdent == id) {
          localStorage.setItem('activeRouterLink', row.routerLink);
          this.selectedComponentRefresh.setMessage('pane selected');
          this.selectservice.getCompanyDetails(row.company_id).subscribe(res => {
            this.currentCompany = res[0];
            //console.log('++++++++++++++++',this.currentCompany)
          })
        }
      });
    });
  }

  drop(event: CdkDragDrop<any[]> | any) {
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.tabs.forEach((el: any, index) => {
      this.updateTabOrder(el._id.$oid, index + 1);
    });
  }

  splitArea(dir: string) {
    if (dir == 'vr') {
      if (this.tabAreaData.columns.length < 3) {
        let paneIdent = '';
        const chars =
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const l = 24;
        let randomstring = '';
        for (let i = 0; i < l; i++) {
          const rnum = Math.floor(Math.random() * chars.length);
          randomstring = randomstring + chars.substring(rnum, rnum + 1);
        }
        paneIdent = paneIdent + randomstring;

        this.tabAreaData.columns.push({
          size: this.screenWidth / 3,
          rows: [
            {
              paneIdent: paneIdent,
              size: this.screenHeight / 3,
              routerLink: 'charts',
              company_id: '',
            },
          ],
        });
        this.updateService
          .updateTabSplits(this.tabAreaData)
          .subscribe((res) => {});
      } else {
        alert('maximun exceeded')
        //this.toastr.info('You can not add more than three columns', 'Warning!');
      }
    } else if (dir == 'hr') {
      this.tabAreaData.columns.filter((x: any) => {
        if (x.rows.length < 3) {
          x.rows.forEach((el: any) => {
            if (el.paneIdent == this.selectedPaneId) {
              let paneIdent = '';
              const chars =
                '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
              const l = 24;
              let randomstring = '';
              for (let i = 0; i < l; i++) {
                const rnum = Math.floor(Math.random() * chars.length);
                randomstring = randomstring + chars.substring(rnum, rnum + 1);
              }
              paneIdent = paneIdent + randomstring;
              x.rows.push({
                paneIdent: paneIdent,
                size: this.screenHeight / 4,
                routerLink: 'charts',
                company_id: '',
              });
            }
          });
        } else if (x.rows.length == 3) {
          //this.toastr.info('You can not add more than three rows', 'Warning!');
        }
      });
      this.updateService
        .updateTabSplits(this.tabAreaData)
        .subscribe((res) => {});
    }
  }

  /*confirmDeletePane(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePaneItem(id);
      },
      reject: () => {},
    });
  }*/

  deletePaneItem(id: any) {
    this.tabAreaData.columns.filter((x: any) => {
      x.rows.forEach((el: any, index: any) => {
        if (el.paneIdent == id) {
          x.rows.splice(index, 1);
        }
      });
    });

    this.tabAreaData.columns.filter((x: any, index: any) => {
      if (x.rows.length == 0) {
        this.tabAreaData.columns.splice(index, 1);
      }
    });

    this.updateService.updateTabSplits(this.tabAreaData).subscribe((res) => {});
  }

  onDragEnd(
    columnindex: number,
    e: { gutterNum: number; sizes: Array<number> } | any
  ) {
    // Column dragged
    if (columnindex === -1) {
      // Set size for all visible columns
      this.columns.forEach(
        (column: any, index: any) => (column.size = e.sizes[index])
      );
      this.tabAreaData.columns = this.columns;
      this.updateService
        .updateTabSplits(this.tabAreaData)
        .subscribe((res) => {});
    }
    // Row dragged
    else {
      // Set size for all visible rows from specified column
      this.columns[columnindex].rows.forEach(
        (row: any, index: any) => (row.size = e.sizes[index])
      );
      this.tabAreaData.columns = this.columns;
      this.updateService
        .updateTabSplits(this.tabAreaData)
        .subscribe((res) => {});
    }
  }

  fullScreenBox() {
    let id = localStorage.getItem('selectedPane');
    let element = document.getElementById(id + '');
    if (screenfull.isEnabled) {
      screenfull.request(element!);
    }
  }

  undoAction() {
    this.prevaction--;
    this.nextaction--;
    let actions = JSON.parse(this.sessionStorageData).actions;
    if (actions[this.prevaction].action == 'create') {
      if (actions[this.prevaction].model == 'templateTabs') {
        this.userDelete
          .deleteTemplateTab(actions[this.prevaction].item_id)
          .subscribe((res) => {
            this.refresh1.setMessage('tab name updated');
          });
      }
    }
  }
  redoAction() {
    this.prevaction++;
    this.nextaction++;
    console.log(JSON.parse(this.sessionStorageData).actions[this.nextaction]);
  }

  closeAllOtherPanes() {
    let id = localStorage.getItem('selectedPane');

    this.columns.forEach((el) => {
      el.rows.forEach((element: any, index: any) => {
        if (element.paneIdent !== id) {
          el.rows.splice(index, 1);
          this.tabAreaData.columns = this.columns;
          this.updateService
            .updateTabSplits(this.tabAreaData)
            .subscribe((res) => {});
        }
      });
    });

    this.columns.forEach((el) => {
      el.rows.forEach((element: any, index: any) => {
        if (element.paneIdent !== id) {
          el.rows.splice(index, 1);
          this.tabAreaData.columns = this.columns;
          this.updateService
            .updateTabSplits(this.tabAreaData)
            .subscribe((res) => {});
        }
      });
    });

    this.columns.forEach((el, index) => {
      if (el.rows.length == 0) {
        this.columns.splice(index, 1);
        this.tabAreaData.columns = this.columns;
        this.updateService
          .updateTabSplits(this.tabAreaData)
          .subscribe((res) => {});
      }
    });

    this.columns.forEach((el, index) => {
      if (el.rows.length == 0) {
        this.columns.splice(index, 1);
        this.tabAreaData.columns = this.columns;
        this.updateService
          .updateTabSplits(this.tabAreaData)
          .subscribe((res) => {});
      }
    });

    this.columns.forEach((el, index) => {
      if (el.rows.length == 0) {
        this.columns.splice(index, 1);
        this.tabAreaData.columns = this.columns;
        this.updateService
          .updateTabSplits(this.tabAreaData)
          .subscribe((res) => {});
      }
    });
  }

  fullScreenPane() {
    let id = localStorage.getItem('selectedPane');
    let area = document.getElementById(id + '');

    area!.style.display = 'block';
    /*if(screenfull.isEnabled) {
      screenfull.request();
      this.fullscreen = true;
    }*/
  }

  closeBox(id: any) {
    let b = document.getElementById(id);
    b!.style.display = 'none';
    /*console.log(b);
    if(screenfull.isFullscreen) {
      screenfull.exit();
      this.fullscreen = false;
    }*/
  }

  setSelectedRouterLink(link: string) {
    let id = localStorage.getItem('selectedPane');
    let tab_id = localStorage.getItem('selected_Tab') + '';
    this.templateService.getSplitArea(tab_id).subscribe((res) => {
      this.splitAreaComponents = res[0];

      console.log('-----+++++++---------',this.splitAreaComponents.columns)
      this.splitAreaComponents.columns.forEach((col: any) => {
        col.rows.forEach((row: any) => {
          if (row.paneIdent == id) {
            row.routerLink = link;
            row.company_id = localStorage.getItem('selected_company_id');
            this.updateService
              .updateTabSplits(this.splitAreaComponents)
              .subscribe((res: any) => {
                this.splitAreasRefresh.setMessage('split the area');
                this.componentRouterLink = link;
                localStorage.setItem('activeRouterLink', link);
              });
          }
        });
      });
    });
  }

}
