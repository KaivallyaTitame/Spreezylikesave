import { Component, OnInit } from '@angular/core';
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';

@Component({
  selector: 'app-ad-feed',
  templateUrl: './ad-feed.component.html',
  styleUrls: ['./ad-feed.component.css']
})
export class AdFeedComponent implements OnInit {
  ads: AdvertisementDetails[] = [];
  isLoading: boolean = false;
  showLoader: boolean = true;
  errorMessage: string = '';
  showErrorPopup: boolean = false;

  constructor(private advertisementDetailsService: AdvertisementDetailsService) {}

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

    const timeoutId = setTimeout(() => {
      if (this.isLoading) {
        console.log('Network appears slow, showing skeleton');
      }
    }, 1000);

    this.advertisementDetailsService.getAdvertisementDetails().subscribe({
      next: (response) => {
        console.log(response)
        clearTimeout(timeoutId);
        this.ads = response;
        this.isLoading = false;
      },
      error: (error) => {
        clearTimeout(timeoutId);
        this.errorMessage = 'Failed to load ads';
        this.showErrorPopup = true;
        this.isLoading = false;
        console.error('API Error:', error);
      }
    });
  }
}