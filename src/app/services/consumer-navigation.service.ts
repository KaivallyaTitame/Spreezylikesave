import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsumerNavigationService {
  Is_Home: boolean = true; // You can set the default screen to be active initially
  Is_Search: boolean = false;
  Is_Notification: boolean = false;
  Is_Profile: boolean = false;

  // Reset the states (optional helper function)
  resetNavigation() {
    this.Is_Home = false;
    this.Is_Search = false;
    this.Is_Notification = false;
    this.Is_Profile = false;
  }
  setActiveScreen(screen: string) {
    this.resetNavigation();
    switch (screen) {
      case 'Home':
        this.Is_Home = true;
        break;
      case 'Search':
        this.Is_Search = true;
        break;
      case 'Notification':
        this.Is_Notification = true;
        break;
      case 'Profile':
        this.Is_Profile = true;
        break;
      default:
        this.Is_Home = true; // Fallback to home if the screen doesn't match
        break;
    }
  }
}
