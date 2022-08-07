import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  api: string = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  SelectUserCompanySheets(user_id: string, company_id: string): Observable<any[]> {
    return this.http.get<any[]>(this.api+'SelectUserCompanySheets/'+user_id+'/'+company_id);
  }

  saveInitUserSheet(fd: any):Observable<any> {
  	return this.http.post<any>(this.api + 'saveInitUserSheet', fd);
  }

  deleteSheetVersion(id: string): Observable<any> {
    return this.http.post<any>(this.api+'deleteSheetVersion', {id});
  }

  updateFileName(name: string, id: string): Observable<any> {
    return this.http.post<any>(this.api+'updateFileName', {name, id});
  }
}
