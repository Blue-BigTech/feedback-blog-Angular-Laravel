import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { ProfileRefreshService } from 'src/app/shared/refreshers/profile-refresh.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { EmailsService } from 'src/app/shared/services/user/emails.service';
import { UserAccountService } from 'src/app/shared/services/user/user-account.service';
import { UserDataService } from 'src/app/shared/services/user/user-data.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  @ViewChild('newPassword') newPassword: any;
  @ViewChild('newPasswordConfirm') newPasswordConfirm: any;

  workplace: any = 'Student';
  user: User = new User;
  usermail: string = '';
  workTypes: string[] = [];

  accountRequests: any[] = [];

  profileInfoSaved: boolean = false;

  requestUpdateEmailBool: boolean = false;
  requestVerifEmail: boolean = false;
  emailChanged: boolean = false;

  infoForm!: FormGroup;
  passwordForm!: FormGroup;
  deleteAccountForm!: FormGroup;

  delayDeleteAccount: string = '';

  submitting: boolean = false;

  passwordLength: number = 0;
  containChar: boolean = false;
  containDigit: boolean = false;
  passwordConfirmed: boolean = false;

  emaildataInit: FormGroup;
  emaildataChange: FormGroup;

  passwordError: string = '';
  emailChangeError: string = '';
  successMessage: string[] = ['','',''];

  constructor(
    private fb: FormBuilder,
    private userdataservice: UserDataService,
    private useraccountservice: UserAccountService,
    private emailService: EmailsService,
    private profilerefresh: ProfileRefreshService,
    private authentication: AuthenticationService
  ) {
    this.deleteAccountForm = this.fb.group({
      user_id: ['']
    });
    this.infoForm= this.fb.group({
      id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      workType: ['']
    });

    this.emaildataInit = this.fb.group({
      email: [''],
    });

    this.emaildataChange = this.fb.group({
      user_id: [''],
      email: [''],
      code: ['']
    })

    this.passwordForm = this.fb.group({
      email: [''],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConf: ['', Validators.required]
    });

    this.workTypes = [
      'Venture Capital',
      'Individual Investor',
      'Student',
      'Other'
    ];
  }



  ngOnInit() {
    this.userdataservice.getCurrentUser(localStorage.getItem('token')+'').subscribe(res => {
      this.user = res;
      this.emaildataInit.controls['email'].setValue(this.user.email);

      this.getDeleteAccountRequest(this.user._id);

      this.emaildataChange.controls['user_id'].setValue(this.user._id);
      this.emaildataChange.controls['email'].setValue(this.user.email);
      this.usermail = this.user.email+'';
      this.infoForm.controls['id'].setValue(this.user._id);
      this.infoForm.controls['first_name'].setValue(this.user.fname);
      this.infoForm.controls['last_name'].setValue(this.user.lname);
      this.infoForm.controls['workType'].setValue(this.user.workType);

      this.deleteAccountForm.controls['user_id'].setValue(this.user._id);

      this.passwordForm.controls['email'].setValue(this.user.email);

    })
    this.workplace = localStorage.getItem('typeWorkspace');

    this.profilerefresh.getMessage().subscribe(res => {
      this.userdataservice.getCurrentUser(localStorage.getItem('token')+'').subscribe(res => {
        this.user = res;

        this.getDeleteAccountRequest(this.user._id);

        this.emaildataInit.controls['email'].setValue(this.user.email);

        this.emaildataChange.controls['user_id'].setValue(this.user._id);
        this.usermail = this.user.email+'';
        console.log(this.usermail)
        this.infoForm.controls['id'].setValue(this.user._id);
        this.infoForm.controls['first_name'].setValue(this.user.fname);
        this.infoForm.controls['last_name'].setValue(this.user.lname);
        this.infoForm.controls['workType'].setValue(this.user.workType);

      })
    })
  }

  getDeleteAccountRequest(id: string) {
    this.useraccountservice.getDeleteAccountRequest(id).subscribe(res => {
      this.accountRequests = res;
      if(this.accountRequests.length !== 0) {
        //let created_at = Date.parse(this.accountRequests[0].created_at);

        //console.log('+++++', this.accountRequests[0].created_at);
        const d = new Date(this.accountRequests[0].created_at);
        //console.log(Date.parse(d.toString()));

        d.setDate(d.getDate() + 7);

        const after7Days = Date.parse(d.toString());
        const now = Date.parse((new Date()).toString());

        const duration = (after7Days - now)/1000;

        var seconds = parseInt(duration.toString(), 10);

        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds / 60);
        seconds  -= mnts*60;
        console.log(days+" days, "+hrs+" Hrs, "+mnts+" Minutes, "+seconds+" Seconds");

        this.delayDeleteAccount = days+" Days, "+hrs+" Hours"

      }
    });
  }

  emailChange() {
    this.emailChanged = true;
  }
  requestUpdateEmail() {
    this.submitting = true;
    this.emailService.requestUpdateEmail(this.emaildataInit.value).subscribe(res => {
      console.log(res);
      this.submitting = false;
      this.emaildataChange.controls['email'].setValue(this.emaildataInit.value.email);
      this.requestUpdateEmailBool = true;
      this.emailChanged = false;
    });
  }

  UpdateEmail() {
    this.submitting = true;
    this.emailService.UpdateEmail(this.emaildataChange.value).subscribe(
      (res) => {
        this.submitting = false;
        console.log(res);
        this.requestUpdateEmailBool = false;
        this.profilerefresh.setMessage('email updated');
        this.successMessage[1] = 'Your email updated successfully!'
        setTimeout(() => {
          this.successMessage[1] = ''
        }, 5000);
      },
      (error) => {
        this.emailChangeError = 'Your entred code incorrect'
        this.successMessage[1] = '';
      }
    );
  }

  emailSent() {
    this.profilerefresh.setMessage('email verified');
  }











  profileInfoChanges() {
    this.profileInfoSaved = true;
    if(this.infoForm.controls['first_name'].value == '' || this.infoForm.controls['last_name'].value == '') {
      this.profileInfoSaved = false;
    }
  }

  resendVerifEmail() {
    this.emailService.resendVerifEmail(this.emaildataInit.value.email).subscribe(res => {
      this.requestVerifEmail = true;
      console.log(res);
    });
  }
  confirmVerifEmaill() {

    this.userdataservice.getCurrentUser(localStorage.getItem('token')+'').subscribe(res => {
      this.user = res;
      this.requestUpdateEmailBool = false;
    });
  }

  verifPasswordInput() {
    //console.log(this.newPassword.nativeElement);
    this.passwordLength = this.newPassword.nativeElement.value.length;
    if(this.newPassword.nativeElement.value.match(/[a-z]/i)) {
      this.containChar = true;
    } else {
      this.containChar = false;
    }

    if(this.newPassword.nativeElement.value.match(/[0-9]/i)) {
      this.containDigit = true;
    } else {
      this.containDigit = false;
    }

    if(this.newPassword.nativeElement.value == this.newPasswordConfirm.nativeElement.value && this.newPassword.nativeElement.value.length >= 6 && this.newPassword.nativeElement.value.length <= 40 ) {
      this.passwordConfirmed = true;
    } else {
      this.passwordConfirmed = false;
    }
  }

  chooseTypeOfWork(type: string) {
    this.workplace = type;
    localStorage.setItem('typeWorkspace', type);
  }

  updateProfileInfo() {
    console.log('++++++', this.infoForm)
    //this.infoForm.value.workType = this.user.workType;
    this.useraccountservice.updateProfileInfo(this.infoForm.value).subscribe(res => {
      console.log(res);
      this.profilerefresh.setMessage('profile info updated');
      this.profileInfoSaved = false;
    })
  }

  chooseWorkType(workType: string) {
    this.infoForm.controls['workType'].setValue(workType);
    this.profileInfoSaved = true;
    console.log(this.infoForm.value)
  }

  updatePassword() {
    this.authentication.updatePassword(this.passwordForm.value).subscribe(
      (res) => {
        console.log('+++++++',res);
        this.passwordForm.controls['password'].setValue('');
        this.passwordForm.controls['newPassword'].setValue('');
        this.passwordForm.controls['newPasswordConf'].setValue('');
        this.passwordError = '';
        this.successMessage[2] = 'Your password changed Successfully';
        setTimeout(() => {
          this.successMessage[2] = '';
        }, 5000);
        this.passwordLength = 0;
        this.containChar = false;
        this.containDigit = false;
        this.passwordConfirmed = false;
      },
      (error) => {
        this.passwordError = error.error.error;
      }
    )
  }

  deleteAccountRequest() {
    this.useraccountservice.deleteAccountRequest(this.deleteAccountForm.value).subscribe(
      (res)=> {
        this.profilerefresh.setMessage('delete account request');
      },
      (error)=> {
        console.log(error);
      }
    )
  }
  CancelDeleteAccountRequest() {
    this.useraccountservice.CancelDeleteAccountRequest(this.user._id).subscribe(res => {
      console.log(res);
      this.profilerefresh.setMessage('delete account canceled');
    });
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.emaildataChange.controls['code'].setValue(code);
    console.log(this.emaildataChange.value);
  }
}
