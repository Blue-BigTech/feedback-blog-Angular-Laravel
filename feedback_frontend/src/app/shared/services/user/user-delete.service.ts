import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDeleteService {
  api = environment.api;
  constructor(
    private http: HttpClient,
  ) { }

  deleteTemplateTab(id: string): Observable<any> {
    return this.http.post<any>(this.api + 'deleteTemplateTab', {id});
  }


}
