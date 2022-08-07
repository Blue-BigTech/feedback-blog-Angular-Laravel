import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { environment } from 'src/environments/environment';
import { LoginRegisterModalService } from 'src/app/shared/services/login-register-modal.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TokenService } from 'src/app/shared/services/auth/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  public error: any = [];

  private api = environment.api;

  /*public form = {
    fname: null,
    lname: null,
    email: null,
	  role: 'user',
    phone: '',

    country: 'Tunisia',
    adress1: null,
    adress2: null,
    codepostal: null,

    profile_status: true,

    online_status: false,
    block_status: false,
    block_reason: null,

    badge: null,
    verified_account: false,
    verified_payment: false,

    password: null,
    password_confirmation: null,
    token: null
  };*/

  constructor(
    private readonly formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    public serv: LoginRegisterModalService,
    private Auth: AuthService,
    private token: TokenService,
  ) {}

  ngOnInit(): void {
    //this.get();
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
      email_verif_status: new FormControl(false),
    });
  }

  get() {
    return this.http
      .get<any[]>(environment.api + 'getAll/' + 'skills')
      .subscribe((res) => {
        console.log(res);
      });
  }

  onSignup() {
    const chars = '0123456789abcdef';
    const l = 20;
    let randomstring = '';
    for (let i = 0; i < l; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring = randomstring + chars.substring(rnum, rnum + 1);
    }

    //this.signupForm.uid = '~' + randomstring;
    //this.form.uid =randomstring

    console.log(this.form);

    this.authentication.SignUp(this.form.value).subscribe(
      (data) => this.handleRegisterResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleRegisterResponse(data: any) {
    this.token.handle(data.access_token);
    this.token.setEmail(data.email, data.role);
    this.Auth.changeAuthStatus(true);
    console.log(data);
    this.serv.displayRegisterModal = false;
    this.serv.displayLoginModal = true;
    //this.router.navigateByUrl('/'); //profile-settings
  }

  handleError(error: any) {
    if (error !== null) {
      //this.error[0] = error.error.errors.email;
      //this.error[1] = error.error.errors.password;
      console.log(error);
    }
    /*for (let i = 0; i < this.error.length; i++) {
      if (this.error[i] != undefined) {
        this.toastr.error(this.error[i], 'Error Occured!');
      }
    }*/
  }
}
