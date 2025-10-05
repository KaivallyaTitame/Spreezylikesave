import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Location } from '@angular/common';
import { App as CapacitorApp } from '@capacitor/app'; // For Capacitor v5
import { UserInteractionSyncService } from './services/user-interaction-sync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'spreezy-frontend';
  showError: boolean = false;
  errorCode: string = '';
  errorDescription: string = '';

  constructor(
    private location: Location,
    private syncService: UserInteractionSyncService
  ) {
    this.lockOrientation();
    // Load user interactions from backend on app start
    this.loadUserInteractions();
    
    // Listen for the hardware back button (Capacitor v5 syntax)
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.addListener(
        'backButton',
        (event: { canGoBack: boolean }) => {
          // If you have a popup, close it here instead of going back
          if (this.showError) {
            this.showError = false;
            return;
          }
          // Otherwise, go back in history
          if (event.canGoBack) {
            this.location.back();
          } else {
            // Optionally exit the app if at root
            // CapacitorApp.exitApp();
          }
        }
      );
    }
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
    if (Capacitor.getPlatform() === 'android') {
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
