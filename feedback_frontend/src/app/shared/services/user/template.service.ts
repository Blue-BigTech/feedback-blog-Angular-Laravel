import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tab } from '../../models/Tab';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  api: string = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  CreateTemplateTab(fd: any):Observable<any> {
  	return this.http.post<any>(this.api + 'CreateTemplateTab', fd);
  }

  CreateActionHistory(hist: any):Observable<any> {
  	return this.http.post<any>(this.api + 'CreateActionHistory', hist);
  }

  getUserTemplateTabs(id: any): Observable<Tab[]> {
    return this.http.get<Tab[]>(this.api+'getUserTemplateTabs/'+id);
  }

  getActionHistory(id: string): Observable<any> {
    return this.http.get<any>(this.api + 'getActionHistory/' + id);
  }

  deleteTemplateTab(id: string): Observable<any> {
    return this.http.post<any>(this.api + 'deleteTemplateTab', {id});
  }

  deletePaneArea(id: string): Observable<any> {
    return this.http.post<any>(this.api + 'deletePaneArea', {id});
  }

  initSplitArea(data: any) {
    return this.http.post<any>(this.api + 'initSplitArea', data);
  }
  getSplitArea(id: string): Observable<any> {
    return this.http.get<any>(this.api + 'getSplitArea/' + id);
  }
}
