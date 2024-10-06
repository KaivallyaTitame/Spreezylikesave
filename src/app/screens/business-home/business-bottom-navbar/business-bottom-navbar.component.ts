import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faBell, faChartColumn, faCirclePlus, faCircleUser, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { mdiChartBoxOutline } from '@mdi/js';
import { BusinessNavigationServiceService } from 'src/app/services/business-navigation-service.service';
import { HomeModule } from '../../home-screen/home-screen.module';
import { AddPostModule } from '../../add-post/add-post.module';
import { ProfileScreenModule } from '../../profile-screen/profile-screen.module';
import { BusinessInsightsModule } from '../../insights/insights.module';

@Component({
  selector: 'app-business-bottom-navbar',
<<<<<<< HEAD
  templateUrl: './business-bottom-navbar.component.html'
=======
  templateUrl: './business-bottom-navbar.component.html',
  styles: [`
    .nav-icon {
      color: #FFFFFF; 
      font-size: 24px;
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .nav-icon:hover, .active-icon {
      color: #007BFF; 
      transform: scale(1.2); 
    }

    .nav-icon-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      transition: background-color 0.3s ease;
    }
    .nav-icon-container:hover {
      background-color: rgba(0, 123, 255, 0.1); 
      border-radius: 50%; 
    }
  `]
>>>>>>> bc8790b (Corrected Routes for consumer-home and business-home)
})
<<<<<<< HEAD
export class BusinessBottomNavbarComponent {
  constructor(private router: Router, private _navigation: BusinessNavigationServiceService) {}
  Home_screen_active: boolean = this._navigation.Is_Home;
  Insights_screen_active: boolean = this._navigation.Is_Insights;
  Post_screen_active: boolean = this._navigation.Is_Post;
  Notification_screen_active: boolean = this._navigation.Is_Notification;
  Profile_screen_active: boolean = this._navigation.Is_Profile;


  Home() {
<<<<<<< HEAD
    this.router.navigate(['/businessnavbar/home']);
    this.updateActiveState('Home');
=======
    this.router.navigate(['business-home/businessnavbar']);
    this.updateActiveState('home');
>>>>>>> bc8790b (Corrected Routes for consumer-home and business-home)
=======
export class BusinessBottomNavbarComponent implements OnInit {

  faHome = faHome;
  faAdd = faAdd;
  faBell = faBell;
  faUser = faUser;
  faChartLine = faChartLine;
  faCirclePlus = faCirclePlus;
  faChartColumn = faChartColumn;
  faCircleUser = faCircleUser;

  homeScreenActive = false;
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
    this.homeScreenActive = false;
    this.insightsScreenActive = false;
    this.postScreenActive = false;
    this.notificationScreenActive = false;
    this.profileScreenActive = false;

    this.navigation.Is_Home = false;
    this.navigation.Is_Insights = false;
    this.navigation.Is_Post = false;
    this.navigation.Is_Notification = false;
    this.navigation.Is_Profile = false;
  }

  private updateActiveState(screen: string) {
    this.resetActiveStates(); 

    switch (screen.toLowerCase()) {
      case 'home':
        this.homeScreenActive = true;
        this.navigation.Is_Home = true;
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
      case 'home':
        return this.homeScreenActive;
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