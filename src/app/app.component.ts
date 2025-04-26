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
  errorTitle:string = ''; 
  errorMessage:string = '';

  constructor(private location: Location){

  }
  
  showErrorPopup(titleI: string, message: string) {
    console.log(titleI); 
    console.log(message); 
    this.errorTitle = titleI;
    this.errorMessage = message;
    this.showError = true;
    console.log(this.showError); 
    console.log(this.errorTitle); 
    console.log(this.errorMessage); 
  }

  onCloseError() {
    this.showError = false;
    this.location.back(); 
  }


}