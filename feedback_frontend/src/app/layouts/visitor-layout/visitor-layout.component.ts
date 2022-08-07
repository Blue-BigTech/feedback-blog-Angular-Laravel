import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-layout',
  templateUrl: './visitor-layout.component.html',
  styleUrls: ['./visitor-layout.component.scss'],
})
export class VisitorLayoutComponent implements OnInit {
  displayModal: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  showModal() {
    this.displayModal = true;
  }
}
