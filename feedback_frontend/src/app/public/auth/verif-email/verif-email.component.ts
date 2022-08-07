import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileRefreshService } from 'src/app/shared/refreshers/profile-refresh.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.scss']
})
export class VerifEmailComponent implements OnInit {

  verifForm!: FormGroup;
  token: any = '';

  constructor(
    private authentication: AuthenticationService,
    private route: ActivatedRoute,
    private profilerefresh: ProfileRefreshService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
  		this.token = params['token']
  	});

    this.verifForm = new FormGroup({
      resetToken: new FormControl(this.token)
    });

    this.authentication.verifEmail(this.verifForm.value).subscribe(res => {
      this.profilerefresh.setMessage('email verified');
      console.log(res);
    })
  }

}
