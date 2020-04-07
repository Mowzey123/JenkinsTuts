import { Injectable, Output, ElementRef, EventEmitter } from '@angular/core';

import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackdropService {

  constructor() {}

  @Output() open: EventEmitter<boolean> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  show() {
    this.open.emit();
  }

  hide() {
    this.close.emit();
  }

}
