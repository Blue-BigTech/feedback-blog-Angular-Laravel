import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  SignUp(data: any){
    return this.http.post(`${this.api}signup`, data)
  }

  SignIn(data: any){
    return this.http.post(`${this.api}login`, data, {withCredentials: true})
  }

  sendPasswordResetLink(data: any) {
  	return this.http.post(this.api+'sendPasswordResetLink', data);
  }


  changePassword(data: any) {
  	return this.http.post(this.api+'resetPassword', data);
  }

  verifEmail(data: any) {
    return this.http.post(this.api+'verifEmail', data);
  }

  sendRegisterLink(data: any) {
    return this.http.post(this.api+'sendRegisterLink', data);
  }

  updatePassword(data: any) {
    return this.http.post(this.api+'updatePassword', data);
  }
}
