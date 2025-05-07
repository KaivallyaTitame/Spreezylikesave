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