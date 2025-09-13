import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAddressBook, faArrowRightFromBracket, faBars, faCircleQuestion, faFileLines, faFilePen, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessNavigationService } from 'src/app/services/business-navigation.service';
import { DecodedToken } from 'src/app/models/decoded-token';
import { JwtDecoderService } from 'src/app/services/jwtDecoder/jwt-decoder.service';
import { BusinessInformation } from 'src/app/models/business-information';
import { ImageUrlGenerationService } from 'src/app/shared/image-url-generation.service';

@Component({
  selector: 'app-business-top-navbar',
  templateUrl: './business-top-navbar.component.html',
  styleUrls: ['./business-top-navbar.component.css']
})
export class BusinessTopNavbarComponent implements OnInit {

  // FontAwesome Icons
  defaultProfileImage: string = 'assets/default-pic.png';
  faBars = faBars;
  faSearch = faSearch;
  faGear = faGear;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faCircleQuestion = faCircleQuestion;
  faFileLines = faFileLines;
  faFilePen = faFilePen;
  addressBook = faAddressBook

  // Variables for business info and token decoding
  business : BusinessInformation = new BusinessInformation();
  currentUsername: string = '';
  decodedToken: DecodedToken | null = null;

  // settingsDrawer to manage the state of the settings drawer
  settingsDrawer = { checked: false };  // assuming the default state is false
  
  constructor(
    private router: Router,
    private businessNavigationService: BusinessNavigationService,
    private authServcie: AuthService,
    private jwtDecoder: JwtDecoderService,
    private imageService : ImageUrlGenerationService
  ) { }

  ngOnInit(): void {
    this.decodeToken();
    this.fetchBusinessDetails();
  }

  // Decodes the token to get user info
  decodeToken(): void {
    const token = localStorage.getItem('token') || '';
    if (token) {
      try {
        this.decodedToken = this.jwtDecoder.decodeInfoFromToken(token);
        this.currentUsername = this.decodedToken?.sub || '';
      } catch (error) {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Navigates to settings and closes the drawer
  navigateToSettings(drawerLeft: HTMLInputElement): void {
    drawerLeft.checked = false;
    this.router.navigate(['business-home/settings']);
  }
  navigateToFeedback(drawerLeft: HTMLInputElement): void {
    drawerLeft.checked = false;
    this.router.navigate(['business-home/feedback']);
  }
  
  navigateToTermsConditions(drawerLeft: HTMLInputElement): void {
    drawerLeft.checked = false;
    this.router.navigate(['business-home/terms-conditions']);
  }

  // Navigates to the search page
  navigateToSearch(): void {
    this.router.navigate(['business-home/search']);
  }

  // Fetches business details using the current username
  fetchBusinessDetails(): void {
    if (this.currentUsername) {
      this.businessNavigationService.getBusinessDetails(this.currentUsername).subscribe({
        next: (response) => {
          this.business = response[0];
          console.log(this.business);
          this.business.profilePicture = this.imageService.generateImageUrl(this.business.profilePicture);
        },
        error: () => {
          throw new Error("Error while loading details");;
        }
      });
    }
  }

  // Logs the user out
  logout(): void {
    this.authServcie.logout();
  }

  // Closes the drawer when the user clicks the overlay
  closeDrawer(drawerLeft: HTMLInputElement): void {
    drawerLeft.checked = false;
  }

  onImageError(event: Event){
    const target = event.target as HTMLImageElement;
    target.src = this.defaultProfileImage;
  }
}
