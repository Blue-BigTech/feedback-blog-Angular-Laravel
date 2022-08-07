import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { LoginRegisterModalService } from 'src/app/shared/services/login-register-modal.service';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.scss'],
})
export class ResetRequestComponent implements OnInit {
  resetForm!: FormGroup;
  onSend: boolean = true;
  public error = null;
  constructor(
    private readonly formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    public serv: LoginRegisterModalService
  ) {}

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  onRequest() {
    this.onSend = false;
    this.authentication.sendPasswordResetLink(this.resetForm.value).subscribe(
      (data) => {
        this.handleResponse(data);
        this.onSend = true;
      },
      (error) => {
        this.handleError(error);
        this.onSend = true;
      }
    );
  }

  handleResponse(res: any) {
    this.resetForm.reset();
    console.log(res);
  }

  handleError(error: any) {
    //console.log(error);
    this.error = error.error.error;
  }
}
