import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSelectService {

  api = environment.api;

  constructor(
    private http: HttpClient,
  ) { }

  getFeatures(): Observable<any[]> {
    return this.http.get<any[]>(this.api+'getFeatures');
  }
  getFeaturesDetails(id: string): Observable<any[]> {
    return this.http.get<any[]>(this.api+'getFeaturesDetails/'+id);
  }

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.api+'getCompanies');
  }

  getCompanyDetails(id: string): Observable<any> {
    return this.http.get<any>(this.api+'getCompanyDetails/'+id);
  }
}
