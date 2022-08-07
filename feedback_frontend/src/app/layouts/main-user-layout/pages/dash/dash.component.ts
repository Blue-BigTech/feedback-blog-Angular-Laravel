import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  @Input() row: any;
  constructor() { }

  ngOnInit(): void {
    //console.log('--------', this.row);
  }

}
