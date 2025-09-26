import { Component, HostListener} from '@angular/core';
import { Capacitor } from '@capacitor/core';
// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Location } from '@angular/common';
import { UserInteractionSyncService } from './services/user-interaction-sync.service';

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

  constructor(
    private location: Location,
    private syncService: UserInteractionSyncService
  ){
    // locking the screen on intialisation of the screen
    this.lockOrientation();
    // Load user interactions from backend on app start
    this.loadUserInteractions();
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

  async lockOrientation() {
    if(Capacitor.getPlatform() == 'android'){ // if the given platform is android then only it will execute the methood.
      try {
           await ScreenOrientation.lock({ orientation: 'portrait' });
      } catch (error) {
           console.error('Orientation lock failed:', error);
      }
    }

  }

  private loadUserInteractions(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.syncService.loadUserInteractionsFromBackend().subscribe({
        next: (interactions) => {
          // Load the interactions into the state service
          interactions.forEach(interaction => {
            this.syncService['stateService'].updateState(interaction.advertisementId, interaction);
          });
        },
        error: (error) => {
          console.error('Failed to load user interactions on app start:', error);
        }
      });
    }
  }

}