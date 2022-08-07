import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ProfileRefreshService } from 'src/app/shared/refreshers/profile-refresh.service';
import { PopupsServiceService } from 'src/app/shared/services/popups-service.service';
import { ProfileMenuService } from 'src/app/shared/services/profile-menu.service';
import { UserDataService } from 'src/app/shared/services/user/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-window',
  templateUrl: './profile-window.component.html',
  styleUrls: ['./profile-window.component.scss'],
})
export class ProfileWindowComponent implements OnInit {

  filepath = environment.filepath;
  api = environment.api;
  user: User = new User;

  constructor(
    public popupsService: PopupsServiceService,
    public profileService: ProfileMenuService,
    private http: HttpClient,
    private router: Router,
    private userdataservice: UserDataService,
    private profilerefresher: ProfileRefreshService
  ) {}

  ngOnInit(): void {
    this.userdataservice.getCurrentUser(localStorage.getItem('token')+'').subscribe(res => {
      this.user = res;
    })

    this.profilerefresher.getMessage().subscribe(res => {
      this.userdataservice.getCurrentUser(localStorage.getItem('token')+'').subscribe(data => {
        this.user = data;
      })
    })
  }

  @HostListener('window:keydown.escape', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.popupsService.visibleProfileWindow = false;
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    /*this.http.post(this.api+'logout', {}, {withCredentials: true}).subscribe(() => {
      this.router.navigate(['/home']);
      localStorage.removeItem('token');
    });*/
  }
}
