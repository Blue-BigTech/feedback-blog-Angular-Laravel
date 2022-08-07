import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  api = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  updateTabName(id: any, name: any): Observable<any> {
    return this.http.post<any>(environment.api+"updateTabName", {id, name});
  }
  updateTabOrder(id: any, order: any): Observable<any> {
    return this.http.post<any>(environment.api+"updateTabOrder", {id, order});
  }
  updateTabSplits(data: any): Observable<any> {
    return this.http.post<any>(environment.api+"updateTabSplits", data);
  }

  setSelectedRouterLink(data: any): Observable<any> {
    return this.http.post<any>(environment.api+"setSelectedRouterLink", data);
  }
}
