import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  public spinkit = Spinkit;

  api = environment.api;
  token: string = '';

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token')+'';
    //console.log('constructor 2022')
    this.me(this.token);
  }

  me(token: any) {
    /*this.http.get<any>(this.api+'respondWithToken/'+token ).subscribe(res => {
      console.log('++++++++++++++++++++++++');
      console.log(res);
      console.log('++++++++++++++++++++++++');
    });*/
  }
}
