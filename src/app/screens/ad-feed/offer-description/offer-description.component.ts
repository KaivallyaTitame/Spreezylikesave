import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown,faBookmark, faLocationArrow,  faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-offer-description',
  templateUrl: './offer-description.component.html',
  styles: []
})
export class OfferDescriptionComponent implements OnInit {
   offerData: AdvertisementDetails  // To store the offer details
    isExpired: boolean = false;  // Example boolean for checking expiry
    remainingDays: number = 0;  // To store the remaining days for the offer
  
    dropdowns: { [key: string]: boolean } = {
      howToAvail: false,
      termsConditions: false
    };
    advertisementId: number = 0;

  // FontAwesome icons
  faBars = faBars;
  faUserGroup = faUserGroup;
  faMagnifyingGlass = faMagnifyingGlass;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faLocationArrow = faLocationArrow;
  faBookmark = faBookmark;
  faEllipsisVertical = faEllipsisVertical;
  faLocationDot = faLocationDot;
  faHeart = faHeart;
  faBell = faBell;
  faCircleUser = faCircleUser;

  constructor(
    private route: ActivatedRoute,
    private advertisementDetailsService: AdvertisementDetailsService,private router:Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.advertisementId = +params.get('id')!;  // Get ID from the route
      this.getOfferDetails(this.advertisementId);
    });
  }
  
  // Fetch offer details from the service based on the ID
  getOfferDetails(advertisementId: number): void {
    this.advertisementDetailsService.getAdvertisementDetailsById(advertisementId)
      .subscribe({
        next: (response) => {
          this.offerData = response;
          console.log(this.offerData);
          this.checkExpiry(); // Call checkExpiry once the data is received
        },
        error: (err) => {
          console.error('Error fetching offer details:', err);
        }
      });
  }
  

  // Check if the offer is expired
  checkExpiry(): void {
    if (this.offerData) {
      const currentDate = new Date();
      const offerExpiryDate = new Date(this.offerData.offerExpiry);
      this.isExpired = currentDate > offerExpiryDate;
      const timeDiff = offerExpiryDate.getTime() - currentDate.getTime();
      this.remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
  }

  // Toggle dropdown for "How to avail"
  toggleDropdown(key: string): void {
    this.dropdowns[key] = !this.dropdowns[key];
  }

  // Handle the "View on Website" button click
  viewOnWebsite(): void {
    if (this.offerData && this.offerData.websiteLink) {
      window.open(this.offerData.websiteLink, '_blank');
    }
  }

  // Handle "Report" button click (optional functionality)
  showReport(): void {
    console.log('Report clicked');
  }
}