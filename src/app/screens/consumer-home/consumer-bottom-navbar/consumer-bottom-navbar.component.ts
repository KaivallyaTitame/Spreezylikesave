import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faBell, faHome, faUser, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ConsumerNavigationService } from 'src/app/services/consumer-navigation.service';

@Component({
  selector: 'app-consumer-bottom-navbar',
  templateUrl: './consumer-bottom-navbar.component.html',
  styles: []
})
export class ConsumerBottomNavbarComponent {
  constructor(private router: Router, private _navigation: ConsumerNavigationService) {}

  Home_screen_active: boolean = this._navigation.Is_Home;
  Search_screen_active: boolean = this._navigation.Is_Search;
  Notification_screen_active: boolean = this._navigation.Is_Notification;
  Profile_screen_active: boolean = this._navigation.Is_Profile;

  Home() {
    this.router.navigate(['/consumernavbar/home']);
    this.updateActiveState('Home');
  }

  Search() {
    this.router.navigate(['/consumersearch']);
    this.updateActiveState('Search');
  }

  Notification() {
    this.router.navigate(['/consumernotification']);
    this.updateActiveState('Notification');
  }

  Profile() {
    this.router.navigate(['/consumerprofile']);
    this.updateActiveState('Profile');
  }

  // FontAwesome icons
  faHome = faHome;
  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;
  faCircleUser = faCircleUser;

  // This function could be used for applying filters (like color changes) if needed
  getFilter(): string {
    return this.Search_screen_active
      ? 'invert(31%) sepia(60%) saturate(4275%) hue-rotate(328deg) brightness(95%) contrast(97%)'
      : 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)';
  }

  // Updates active state based on the current screen
  private updateActiveState(screen: string) {
    this._navigation.Is_Home = screen === 'Home';
    this._navigation.Is_Search = screen === 'Search';
    this._navigation.Is_Notification = screen === 'Notification';
    this._navigation.Is_Profile = screen === 'Profile';
  }

  // Helper method to check if a specific screen is active
  isActive(screen: string): boolean {
    switch (screen) {
      case 'Home': return this.Home_screen_active;
      case 'Search': return this.Search_screen_active;
      case 'Notification': return this.Notification_screen_active;
      case 'Profile': return this.Profile_screen_active;
      default: return false;
    }
  }
}
