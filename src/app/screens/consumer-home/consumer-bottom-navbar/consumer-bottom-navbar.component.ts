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
    this.router.navigate(['/consumernavbar']);
    this.updateActiveState('Home');
  }

  Search() {
    this.router.navigate(['/search']);
    this.updateActiveState('Search');
  }

  Notification() {
    this.router.navigate(['/notification']);
    this.updateActiveState('Notification');
  }

  Profile() {
    this.router.navigate(['/profile']);
    this.updateActiveState('Profile');
  }

  faHome = faHome;
  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;
  faCircleUser = faCircleUser;

  private updateActiveState(screen: string) {
    this._navigation.Is_Home = screen === 'Home';
    this._navigation.Is_Search = screen === 'Search';
    this._navigation.Is_Notification = screen === 'Notification';
    this._navigation.Is_Profile = screen === 'Profile';
  }

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
