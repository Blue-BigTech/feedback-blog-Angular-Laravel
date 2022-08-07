import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterModalService {
  displayLoginModal: boolean = false;
  displayRegisterModal: boolean = false;
  displayResetPasswordModal: boolean = false;

  constructor() {}
}
