import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { TokenService } from 'src/app/shared/services/auth/token.service';
import { LoginRegisterModalService } from 'src/app/shared/services/login-register-modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public error = null;

  constructor(
    private authentication: AuthenticationService,
    private token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private toastr: ToastrService,
    public serv: LoginRegisterModalService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    this.authentication.SignIn(this.loginForm.getRawValue()).subscribe(
      (data) => this.handleResponse(data)
      ,
      (error) => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    AuthInterceptor.accessToken = data.access_token;

    this.token.handle(data.access_token, data.user._id);
    this.token.setEmail(data.user.email, data.user.role);
    this.Auth.changeAuthStatus(true);
    //console.log(data);
    this.router.navigateByUrl('/us/profile');
  }

  handleError(error: any) {
    this.error = error.error.error;
    console.log(error);
    //this.toastr.error('' + this.error, 'Error Occured!');
  }
}
