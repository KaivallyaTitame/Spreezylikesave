import { Component, HostListener} from '@angular/core';
import { Capacitor } from '@capacitor/core';
// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'spreezy-frontend';
  constructor(){
    // locking the screen on intialisation of the screen
    this.lockOrientation(); 
  }

  async lockOrientation() {
    if(Capacitor.getPlatform() == 'android'){ // if the given platform is android then only it will execute the methood.
      try {
           await ScreenOrientation.lock({ orientation: 'portrait' });
      } catch (error) {
           console.error('Orientation lock failed:', error);
      }
    }

  }


}