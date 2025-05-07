import { Component, HostListener} from '@angular/core';
import { Capacitor } from '@capacitor/core';
// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ScreenOrientation } from '@capacitor/screen-orientation';
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


  constructor(){
    this.lockOrientation(); 
  }

  async lockOrientation() {
    if(Capacitor.getPlatform() == 'android'){
      try {
        await ScreenOrientation.lock({ orientation: 'portrait' });
      } catch (error) {
        console.error('Orientation lock failed:', error);
      }
    }

  }


}