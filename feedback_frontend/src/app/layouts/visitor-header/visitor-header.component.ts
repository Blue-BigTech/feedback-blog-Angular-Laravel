import { Component, OnInit } from '@angular/core';
import { LoginRegisterModalService } from 'src/app/shared/services/login-register-modal.service';

@Component({
  selector: 'app-visitor-header',
  templateUrl: './visitor-header.component.html',
  styleUrls: ['./visitor-header.component.scss'],
})
export class VisitorHeaderComponent implements OnInit {
  constructor(public serv: LoginRegisterModalService) {}

  ngOnInit(): void {}

  showLoginModal() {
    if (this.serv.displayRegisterModal) {
      this.serv.displayRegisterModal = false;
    }
    if (this.serv.displayResetPasswordModal) {
      this.serv.displayResetPasswordModal = false;
    }
    this.serv.displayLoginModal = true;
  }

  showRegisterModal() {
    if (this.serv.displayLoginModal) {
      this.serv.displayLoginModal = false;
    }
    if (this.serv.displayResetPasswordModal) {
      this.serv.displayResetPasswordModal = false;
    }
    this.serv.displayRegisterModal = true;
  }
}
