import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Location } from '@angular/common';
import { App as CapacitorApp } from '@capacitor/app'; // For Capacitor v5

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

  constructor(private location: Location) {
    this.lockOrientation();

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
}
