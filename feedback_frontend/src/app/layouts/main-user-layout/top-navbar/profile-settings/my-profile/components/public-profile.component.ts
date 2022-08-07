import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ProfileRefreshService } from 'src/app/shared/refreshers/profile-refresh.service';
import { UserDataService } from 'src/app/shared/services/user/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  user: User = new User;
  folepath = environment.filepath;
  selectedFile!: File;

  constructor(
    private userdataservice: UserDataService,
    private http: HttpClient,
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

    onFileSelected(event: any) {
      this.selectedFile = <File>event.target.files[0];

      const fd = new FormData();
      fd.append('email', this.user.email!);
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post(environment.api+'profileAvatarUpload', fd).subscribe(res => {
        console.log(res);
        this.profilerefresher.setMessage("new operation");
      });
    }
}
