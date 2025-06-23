import { AuthService } from "src/app/services/auth.service";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service'; 
import { AdvertisementDetails } from 'src/app/models/ad-details';

@Component({
  selector: "app-ad-feed",
  templateUrl: "./ad-feed.component.html",
  styleUrls: ['./ad-feed.component.css'],
})
export class AdFeedComponent implements OnInit {
  ads: AdvertisementDetails []= [];
  errorMessage: string = '';  
  showErrorPopup: boolean = false;
  isLoading: boolean = true; 
  constructor(private advertisementDetailsService: AdvertisementDetailsService, private authService: AuthService) {}

  @ViewChild('feedContainer', { static: true }) feedElement!: ElementRef;

  feedItems = Array.from({ length: 20 }, (_, i) => `Feed Item ${i + 1}`);
  isRefreshing = false;
  indicatorTransform = 'translateY(-50px)';

  private startY = 0;
  private isDragging = false;

  onTouchStart(event: TouchEvent) {
    const scrollTop = this.feedElement.nativeElement.scrollTop;

    if (this.isRefreshing || scrollTop > 0) return; 
    this.startY = event.touches[0].clientY;
    this.isDragging = true;
    console.log("Touch start detected at the top");
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - this.startY;

    if (deltaY > 0 && !this.isRefreshing) {
      this.indicatorTransform = `translateY(${Math.min(deltaY, 100) - 50}px)`;
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;

    const currentY = event.changedTouches[0].clientY;
    const deltaY = currentY - this.startY;

    if (deltaY > 50) {
      this.triggerRefresh();
    } else {
      this.indicatorTransform = 'translateY(-50px)'; 
    }
  }

  triggerRefresh() {
    this.isRefreshing = true;
    this.indicatorTransform = 'translateY(0)';

    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, i) => `New Feed Item ${i + 1}`);
      this.feedItems = [...newItems, ...this.feedItems];
      this.isRefreshing = false;
      this.indicatorTransform = 'translateY(-50px)'; // Reset position
    }, 1500);
  }
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
