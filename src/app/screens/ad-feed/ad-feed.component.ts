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
  ads: AdvertisementDetails[] = [];
  errorMessage: string = '';
  showErrorPopup: boolean = false;
  isLoading: boolean = true;
  isPulling: boolean = false;
  isRefreshing: boolean = false;
  pullDistance: number = 0;
  maxPullDistance: number = 120;
  refreshThreshold: number = 60;
  private startY: number = 0;
  private currentY: number = 0;
  private isAtTop: boolean = false;
  private touchStarted: boolean = false;
  private lastTouchTime: number = 0;

  @ViewChild('feed', { static: false }) feedElement!: ElementRef;

  constructor(
    private advertisementDetailsService: AdvertisementDetailsService,
    private authService: AuthService
  ) { }

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
        console.log(response);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load ads. Please try again later.';
        this.showErrorPopup = true;
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  onTouchStart(event: TouchEvent): void {
    if (this.isRefreshing) return;

    this.startY = event.touches[0].clientY;
    this.touchStarted = true;
    this.isAtTop = this.checkIfAtTop();
    this.lastTouchTime = Date.now();
    if (this.feedElement) {
      this.feedElement.nativeElement.classList.add('pulling');
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.touchStarted || this.isRefreshing || !this.isAtTop) return;

    this.currentY = event.touches[0].clientY;
    const deltaY = this.currentY - this.startY;
    const currentTime = Date.now();
    const timeDiff = currentTime - this.lastTouchTime;
    if (deltaY > 0) {
      event.preventDefault();
      const resistance = 0.6; 
      this.pullDistance = Math.min(deltaY * resistance, this.maxPullDistance);
      this.isPulling = true;
      if (this.pullDistance >= this.refreshThreshold && timeDiff > 100) {
        this.triggerHapticFeedback();
        this.lastTouchTime = currentTime;
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.touchStarted || this.isRefreshing) return;
    this.touchStarted = false;
    if (this.feedElement) {
      this.feedElement.nativeElement.classList.remove('pulling');
    }

    if (this.isPulling && this.pullDistance >= this.refreshThreshold) {
      this.triggerRefresh();
    } else {
      this.resetPullState();
    }
  }

  private checkIfAtTop(): boolean {
    if (!this.feedElement) return true;
    return this.feedElement.nativeElement.scrollTop <= 5; 
  }

  private triggerRefresh(): void {
    this.isRefreshing = true;
    this.isPulling = false;
    setTimeout(() => {
      this.refreshAds();
    }, 200);
  }

  private refreshAds(): void {
    this.advertisementDetailsService.getAdvertisementDetails().subscribe({
      next: (response) => {
        this.ads = response;
        console.log('Ads refreshed:', response);
        this.completeRefresh();
      },
      error: (err) => {
        this.errorMessage = 'Failed to refresh ads. Please try again later.';
        this.showErrorPopup = true;
        console.log('Refresh error:', err);
        this.completeRefresh();
      }
    });
  }

  private completeRefresh(): void {
    setTimeout(() => {
      this.isRefreshing = false;
      this.resetPullState();
    }, 600);
  }

  private resetPullState(): void {
    this.isPulling = false;
    this.pullDistance = 0;
  }

  private triggerHapticFeedback(): void {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    if (navigator.vibrate) {
      navigator.vibrate([10]);
    }
  }

  manualRefresh(): void {
    if (!this.isRefreshing) {
      this.triggerRefresh();
    }
  }
  
  getRefreshStatus(): string {
    if (this.isRefreshing) {
      return 'Refreshing content...';
    } else if (this.isPulling && this.pullDistance >= this.refreshThreshold) {
      return 'Release to refresh';
    } else if (this.isPulling) {
      return 'Pull down to refresh';
    }
    return 'Pull down to refresh';
  }
}