import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faBell, faChartColumn, faCirclePlus, faCircleUser, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { mdiChartBoxOutline } from '@mdi/js';
import { BusinessNavigationServiceService } from 'src/app/services/business-navigation-service.service';
<<<<<<< HEAD
import { HomeModule } from '../../home-screen/home-screen.module';
import { AddPostModule } from '../../add-post/add-post.module';
import { ProfileScreenModule } from '../../profile-screen/profile-screen.module';
import { BusinessInsightsModule } from '../../insights/insights.module';
=======
>>>>>>> aeec045 (\business-home working with docker integration)

@Component({
  selector: 'app-business-bottom-navbar',
<<<<<<< HEAD
  templateUrl: './business-bottom-navbar.component.html'
=======
  templateUrl: './business-bottom-navbar.component.html',
  styles: []
})

export class BusinessBottomNavbarComponent implements OnInit {

  faHome = faHome; 
  faAdd = faAdd;
  faBell = faBell;
  faUser = faUser;
  faChartLine = faChartLine;
  faCirclePlus = faCirclePlus;
  faChartColumn = faChartColumn;
  faCircleUser = faCircleUser;

  adFeedScreenActive = false;  
  insightsScreenActive = false;
  postScreenActive = false;
  notificationScreenActive = false;
  profileScreenActive = false;

  constructor(private router: Router, private navigation: BusinessNavigationServiceService) {}

  ngOnInit(): void {
    this.updateActiveStates();
    this.router.events.subscribe(() => {
      this.updateActiveStates();
    });
  }

  navigateTo(screen: string) {
    this.router.navigate([`/business-home/${screen.toLowerCase()}`]);
    this.updateActiveState(screen);
>>>>>>> f604037 (Addressed Review comments)
  }

  private updateActiveStates() {
    const currentRoute = this.router.url.split('/').pop(); 
    this.resetActiveStates();

    if (currentRoute) {
      this.updateActiveState(currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1));
    }
  }

<<<<<<< HEAD
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
=======
  private resetActiveStates() {
    this.adFeedScreenActive = false;  
    this.insightsScreenActive = false;
    this.postScreenActive = false;
    this.notificationScreenActive = false;
    this.profileScreenActive = false;

    this.navigation.Is_AdFeed = false;  
    this.navigation.Is_Insights = false;
    this.navigation.Is_Post = false;
    this.navigation.Is_Notification = false;
    this.navigation.Is_Profile = false;
  }

  private updateActiveState(screen: string) {
    this.resetActiveStates(); 

    switch (screen.toLowerCase()) {
      case 'adfeed': 
        this.adFeedScreenActive = true;
        this.navigation.Is_AdFeed = true;  
        break;
      case 'insights':
        this.insightsScreenActive = true;
        this.navigation.Is_Insights = true;
        break;
      case 'addpost':
        this.postScreenActive = true;
        this.navigation.Is_Post = true;
        break;
      case 'notification':
        this.notificationScreenActive = true;
        this.navigation.Is_Notification = true;
        break;
      case 'profile':
        this.profileScreenActive = true;
        this.navigation.Is_Profile = true;
        break;
    }
  }

  isActive(screen: string): boolean {
    switch (screen.toLowerCase()) {
      case 'adfeed': 
        return this.adFeedScreenActive;  
      case 'insights':
        return this.insightsScreenActive;
      case 'addpost':
        return this.postScreenActive;
      case 'notification':
        return this.notificationScreenActive;
      case 'profile':
        return this.profileScreenActive;
      default:
        return false;
>>>>>>> bc8790b (Corrected Routes for consumer-home and business-home)
    }
  }
}