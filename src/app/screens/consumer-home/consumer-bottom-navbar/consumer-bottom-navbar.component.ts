import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faBell, faHome, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ConsumerNavigationService } from 'src/app/services/consumer-navigation.service';

@Component({
  selector: 'app-consumer-bottom-navbar',
  templateUrl: './consumer-bottom-navbar.component.html',
  styles: []
})

export class ConsumerBottomNavbarComponent implements OnInit {

  faHome = faHome;
  faSearch = faSearch;
  faBell = faBell;
  faCircleUser = faCircleUser;

  AdFeed_screen_active = false;
  Search_screen_active = false;
  Notification_screen_active = false;
  Profile_screen_active = false;

  constructor(private router: Router, private _navigation: ConsumerNavigationService) {}

  ngOnInit(): void {
    this.updateActiveStates();
    this.router.events.subscribe(() => {
      this.updateActiveStates();
    });
  }

  navigateTo(screen: string) {
    this.router.navigate([`/consumer-home/${screen.toLowerCase()}`]);
    this.updateActiveState(screen); 
  }

  private updateActiveStates() {
    const currentRoute = this.router.url.split('/').pop(); 
    this.resetActiveStates();

    if (currentRoute) {
      this.updateActiveState(currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1));
    }
  }

  private resetActiveStates() {
    this.AdFeed_screen_active = false;
    this.Search_screen_active = false;
    this.Notification_screen_active = false;
    this.Profile_screen_active = false;

    this._navigation.is_AdFeed = false;
    this._navigation.is_Search = false;
    this._navigation.is_Notification = false;
    this._navigation.is_Profile = false;
  }

  private updateActiveState(screen: string) {
    this.resetActiveStates(); 

    switch (screen.toLowerCase()) {
      case 'adfeed':
        this.AdFeed_screen_active = true;
        this._navigation.is_AdFeed = true;
        break;
      case 'search':
        this.Search_screen_active = true;
        this._navigation.is_Search = true;
        break;
      case 'notification':
        this.Notification_screen_active = true;
        this._navigation.is_Notification = true;
        break;
      case 'profile':
        this.Profile_screen_active = true;
        this._navigation.is_Profile = true;
        break;
      default:
        break;
    }
  }

  isActive(screen: string): boolean {
    switch (screen.toLowerCase()) {
      case 'adfeed':
        return this.AdFeed_screen_active;
      case 'search':
        return this.Search_screen_active;
      case 'notification':
        return this.Notification_screen_active;
      case 'profile':
        return this.Profile_screen_active;
      default:
        return false;
    }
  }
}