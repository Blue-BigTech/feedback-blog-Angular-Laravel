import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  @Output() splitEvent = new EventEmitter<string>();
  @Output() chooseTopComponentEvent = new EventEmitter<string>();

  SplitArea(msg: string) {
    this.splitEvent.emit(msg);
  }

  chooseTopLink(msg: string) {
    this.chooseTopComponentEvent.emit(msg);
  }
  constructor() { }
}
