import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token: any, id: string = "") {
    this.setToken(token, id);
  }
  setEmail(email: string, role: any) {
    localStorage.setItem('usermail', email);
    localStorage.setItem('role', role);
  }

  setToken(token: any, id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  removeEmail() {
    localStorage.removeItem('usermail');
  }

  isValid() {
    const token = this.getToken();
    if (token) {
      /*const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }*/
      return true;
    }

    return false;

  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
