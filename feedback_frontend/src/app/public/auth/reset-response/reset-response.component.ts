import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-reset-response',
  templateUrl: './reset-response.component.html',
  styleUrls: ['./reset-response.component.scss']
})
export class ResetResponseComponent implements OnInit {

  resetForm!: FormGroup;
  public error = null;
  token: any = '';

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
  		this.token = params['token']
  	});
    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
      resetToken: new FormControl(this.token)
    });
  }

  onSubmit() {
  	this.authentication.changePassword(this.resetForm.value).subscribe(
  			data => this.handleResponse(data),
  			error => this.handleError(error)
  		);
  }

  handleResponse(data: any) {
  	this.router.navigateByUrl('/login');
  }

  handleError(error: any) {
    console.log(error);
  }

}
