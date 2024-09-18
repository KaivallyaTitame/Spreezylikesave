import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faBell, faChartColumn, faCirclePlus, faCircleUser, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { mdiChartBoxOutline } from '@mdi/js';
import { BusinessNavigationServiceService } from 'src/app/services/business-navigation-service.service';

@Component({
  selector: 'app-business-bottom-navbar',
  templateUrl: './business-bottom-navbar.component.html'
})
export class BusinessBottomNavbarComponent {
  constructor(private router: Router, private _navigation: BusinessNavigationServiceService) {}

  Home_screen_active: boolean = this._navigation.Is_Home;
  Insights_screen_active: boolean = this._navigation.Is_Insights;
  Post_screen_active: boolean = this._navigation.Is_Post;
  Notification_screen_active: boolean = this._navigation.Is_Notification;
  Profile_screen_active: boolean = this._navigation.Is_Profile;

  Home() {
    this.router.navigate(['/businessnavbar/home']);
    this.updateActiveState('Home');
  }

  Insights() {
    this.router.navigate(['/businessinsights']);
    this.updateActiveState('Insights');
  }

  Add_Post() {
    this.router.navigate(['/addpost']);
    this.updateActiveState('Post');
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
  faAdd = faAdd;
  faBell = faBell;
  faUser = faUser;
  faChartColumn = faChartColumn;
  faCirclePlus = faCirclePlus;
  faCircleUser = faCircleUser;
  mdiChartBoxOutline = mdiChartBoxOutline;

  getFilter(): string {
    return this.Insights_screen_active 
      ? 'invert(31%) sepia(60%) saturate(4275%) hue-rotate(328deg) brightness(95%) contrast(97%)'
      : 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)';
  }

  private updateActiveState(screen: string) {
    this._navigation.Is_Home = screen === 'Home';
    this._navigation.Is_Insights = screen === 'Insights';
    this._navigation.Is_Post = screen === 'Post';
    this._navigation.Is_Notification = screen === 'Notification';
    this._navigation.Is_Profile = screen === 'Profile';
  }

  isActive(screen: string): boolean {
    switch(screen) {
      case 'Home': return this.Home_screen_active;
      case 'Insights': return this.Insights_screen_active;
      case 'Post': return this.Post_screen_active;
      case 'Notification': return this.Notification_screen_active;
      case 'Profile': return this.Profile_screen_active;
      default: return false;
    }
  }
}
