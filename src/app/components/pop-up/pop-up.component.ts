// pop-up.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  @Input() messageTitle: string = '';
  @Input() messageBody: string = '';
  @Output() close = new EventEmitter<void>();

  closePopUp() {
    this.close.emit();
  }
}
