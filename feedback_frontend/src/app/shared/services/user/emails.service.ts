import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  api: string = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  resendVerifEmail(email: any): Observable<any> {
    return this.http.post(this.api+'resendVerifEmail', {email});
  }

  requestUpdateEmail(emaildata: any): Observable<any> {
    return this.http.post(this.api+'requestUpdateEmail', emaildata);
  }

  UpdateEmail(data: any): Observable<any> {
    return this.http.post(this.api+'UpdateEmail', data);
  }
}
