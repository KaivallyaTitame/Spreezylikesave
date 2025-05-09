import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs'; 
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service'; 
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { PopUpComponent } from "src/app/components/pop-up/pop-up.component";

@Component({
  selector: 'app-ad-feed',
  templateUrl: './ad-feed.component.html',
  styleUrls: []
})
export class AdFeedComponent implements OnInit {
  ads: AdvertisementDetails []= [];
  errorMessage: string = '';  
  showErrorPopup: boolean = false;
  isLoading: boolean = true; 
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
    this.isLoading = true; 
    this.advertisementDetailsService.getAdvertisementDetails().subscribe({
      next: (response) => {
        this.ads = response;
        this.isLoading = false;
        console.log(response)
      },
      error: (err) => {
        this.errorMessage = 'Failed to load ads. Please try again later.';
        this.showErrorPopup = true;
        this.isLoading = false;
        console.log(err);
      }
    });
  }
}
