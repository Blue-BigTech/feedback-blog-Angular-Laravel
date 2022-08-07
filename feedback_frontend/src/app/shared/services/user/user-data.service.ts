import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  api = environment.api;
  constructor(
    private http: HttpClient,
  ) { }

  getCurrentUser(token: string): Observable<User> {
    return this.http.get<User>(this.api+'getCurrentUser/'+token);
  }
}
