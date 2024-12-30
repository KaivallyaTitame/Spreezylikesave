import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faBell, faChartColumn, faChartLine, faCirclePlus, faCircleUser, faHome, faUser, faSearch  } from '@fortawesome/free-solid-svg-icons';
import { BusinessNavigationService } from 'src/app/services/business-navigation.service';
import { DecodedToken } from'src/app/models/decodedToken';
import { JwtDecoderService } from 'src/app/services/jwtDecoder/jwt-decoder.service';

@Component({
  selector: 'app-business-bottom-navbar',
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
  faSearch = faSearch;

  adFeedScreenActive = false;  
  insightsScreenActive = false;
  postScreenActive = false;
  notificationScreenActive = false;
  profileScreenActive = false;
  currentUser: string = '';
  userType: string;
  searchScreenActive = false;

  constructor(private router: Router, private navigation: BusinessNavigationService, private JwtDecoder: JwtDecoderService) {}

  ngOnInit(): void {
    this.currentUser = this.fetchCurrentUsername();
    this.updateActiveStates();
    this.router.events.subscribe(() => {
      this.updateActiveStates();
    });
  }

  fetchCurrentUsername(): string {
    const token = localStorage.getItem('token') || '';
    const decodedToken: DecodedToken = this.JwtDecoder.decodeInfoFromToken(token);
    this.userType = decodedToken["userType"];
    this.currentUser = decodedToken.sub;
    return decodedToken.sub;
  }

  navigateTo(screen: string) {
    if (screen.toLowerCase() === 'profile') {
      this.router.navigate([`/business-home/profile/business-profile/${this.currentUser}`]);
    } else {
      this.router.navigate([`/business-home/${screen.toLowerCase()}`]);
    }
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
    this.adFeedScreenActive = false;  
    this.insightsScreenActive = false;
    this.postScreenActive = false;
    this.notificationScreenActive = false;
    this.profileScreenActive = false;
    this.searchScreenActive = false;

    this.navigation.is_AdFeed = false;  
    this.navigation.is_Insights = false;
    this.navigation.is_Post = false;
    this.navigation.is_Notification = false;
    this.navigation.is_Profile = false;
    this.navigation.is_Search = false;
  }

  private updateActiveState(screen: string) {
    this.resetActiveStates(); 

    switch (screen.toLowerCase()) {
      case 'adfeed': 
        this.adFeedScreenActive = true;
        this.navigation.is_AdFeed = true;  
        break;
      case 'insights':
        this.insightsScreenActive = true;
        this.navigation.is_Insights = true;
        break;
      case 'addpost':
        this.postScreenActive = true;
        this.navigation.is_Post = true;
        break;
      case 'notification':
        this.notificationScreenActive = true;
        this.navigation.is_Notification = true;
        break;
      case 'profile':
        this.profileScreenActive = true;
        this.navigation.is_Profile = true;
        break;
        case 'search': 
        this.searchScreenActive = true;
        this.navigation.is_Search = true;
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
      case 'search': 
        return this.searchScreenActive;
      default:
        return false;
    }
  }
}