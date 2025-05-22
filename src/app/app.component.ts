import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'spreezy-frontend';
  showError:boolean = false; 
  errorCode:string = ''; 
  errorDescription:string = '';

  constructor(private location: Location){

  }
  
  showErrorPopup(errorCode: string, errorDescription: string) {
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
    this.showError = true;
  }

  onCloseError() {
    this.showError = false;
    this.location.back(); 
  }


}