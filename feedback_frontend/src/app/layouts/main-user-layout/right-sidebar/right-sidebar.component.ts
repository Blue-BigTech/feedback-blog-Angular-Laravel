import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResizeEvent } from 'angular-resizable-element';
import { ProfileMenuService } from 'src/app/shared/services/profile-menu.service';
import { User } from 'src/app/shared/models/User';
import { UserDataService } from 'src/app/shared/services/user/user-data.service';
import { ThemeService } from 'src/app/shared/refreshers/theme.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  token: any = '';
  user: User = new User;
  displayBasic: boolean = false;

  chars: string = '';
  selectedTheme: any = 'default-theme';

  constructor(
    private userdata: UserDataService,
    public serv: ProfileMenuService,
    private modalService: NgbModal,
    private themeRefresher: ThemeService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userdata.getCurrentUser(this.token).subscribe(data => {
      this.user = data;

      //console.log(this.user._id)

      this.chars = this.user.fname!.charAt(0) + this.user.lname!.charAt(0);
    })

    this.selectedTheme = localStorage.getItem('selected-theme');

    this.themeRefresher.getMessage().subscribe(res => {
      this.selectedTheme = localStorage.getItem('selected-theme')
    });
  }

  showBasicDialog(btnID: any) {
    this.serv.activeProfileButton = btnID;
    this.displayBasic = true;
  }

  onMenuClick(btnID: string): void {
    this.serv.activeProfileButton = btnID;
  }

  public style: object = {};

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }

}
