import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopleftComponentsService {

  selectedComponent: string = '';
  openSidePanel: boolean = false;
  openNewsPanel: boolean = false;

  constructor() { }
}
