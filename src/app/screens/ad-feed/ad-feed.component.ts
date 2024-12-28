import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs'; // Ensure this is imported
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service'; 
// import { OfferDescriptionDTO } from 'src/app/models/offerdescriptionGet';

import { AdvertisementDetails } from 'src/app/models/ad-details';
import { PopUpComponent } from "src/app/components/pop-up/pop-up.component";

@Component({
  selector: 'app-ad-feed',
  templateUrl: './ad-feed.component.html',
  styleUrls: []
})
export class AdFeedComponent implements OnInit {
  ads: AdvertisementDetails []= [];
  errorMessage: string = '';  // Variable to store error message
  showErrorPopup: boolean = false; // Flag to show pop-up
  constructor(private advertisementDetailsService: AdvertisementDetailsService, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.fetchAds();
  }

  isExpired(offerExpiry: string): boolean {
    const expiryDate = new Date(offerExpiry);
    const currentDate = new Date();
    return expiryDate < currentDate;
  }

  fetchAds(): void {
    this.advertisementDetailsService.getAdvertisementDetails().subscribe({
      next: (response) => {
        this.ads = response;
      },
      
    });
  }

  
}
