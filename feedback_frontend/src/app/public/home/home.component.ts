import { Component, OnInit, AfterContentInit } from '@angular/core';
import { LoginRegisterModalService } from 'src/app/shared/services/login-register-modal.service';

declare let require: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterContentInit {
  constructor(
    public serv: LoginRegisterModalService
  ) {}

  // ngOnInit(): void {}

  // need for parallax effect
  ngAfterContentInit() {
    const Parallax = require('parallax-js');
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true,
    });
  }

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
