import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  api: string = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  updateProfileInfo(user: User): Observable<any> {
    return this.http.post<any>(this.api+'updateProfileInfo', user);
  }

  deleteAccountRequest(data: any): Observable<any> {
    return this.http.post<any>(this.api+'deleteAccountRequest', data);
  }
  getDeleteAccountRequest(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.api+'getDeleteAccountRequest/'+id);
  }
  CancelDeleteAccountRequest(id: string): Observable<any> {
    return this.http.post<any>(this.api+'CancelDeleteAccountRequest', {id});
  }
}
