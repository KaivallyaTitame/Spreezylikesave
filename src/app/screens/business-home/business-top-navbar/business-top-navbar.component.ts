import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faBars, faCircleQuestion, faFileLines, faFilePen, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessNavigationService } from 'src/app/services/business-navigation.service';
import { DecodedToken } from 'src/app/models/decoded-token';
import { JwtDecoderService } from 'src/app/services/jwtDecoder/jwt-decoder.service';

@Component({
  selector: 'app-business-top-navbar',
  templateUrl: './business-top-navbar.component.html',
  styleUrls: ['./business-top-navbar.component.css']
})
export class BusinessTopNavbarComponent implements OnInit {

  faBars = faBars;
  faSearch = faSearch;
  faGear = faGear;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faCircleQuestion = faCircleQuestion;
  faFileLines = faFileLines;
  faFilePen = faFilePen;

  business: any;
  
  currentUsername: string = '';
  decodedToken: DecodedToken | null = null;

  constructor(
    private router: Router, 
    private businessNavigationService: BusinessNavigationService, 
    private authServcie: AuthService,
    private jwtDecoder: JwtDecoderService) { }

  ngOnInit(): void {
    this.decodeToken();
    this.fetchBusinessDetails();
  }

  decodeToken(): void {
    const token = localStorage.getItem('token') || '';
    if (token) {
      try {
        this.decodedToken = this.jwtDecoder.decodeInfoFromToken(token); 
        this.currentUsername = this.decodedToken?.sub || ''; 
      } catch (error) {
        console.error('Failed to decode token:', error);
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToSettings(drawerLeft: HTMLInputElement): void {
    drawerLeft.checked = false;
    this.router.navigate(['business-home/settings']);
  }

  navigateToSearch(): void {
    this.router.navigate(['business-home/search']);
  }

  fetchBusinessDetails(): void {
    if (this.currentUsername) {
      this.businessNavigationService.getBusinessDetails(this.currentUsername).subscribe({
        next: (response) => {
          this.business = response; // Update with the API response
        },
        error: (error) => {
          console.error('Error fetching business details:', error);
          this.business = {}; // Handle error
        }
      });
    }
  }

  logout(){
    this.authServcie.logout()
  }
}