import { Component, HostListener,ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser , faBookmark , faPaperPlane  } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline ,} from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { faBookmark as solidBookmark , faBookmark as regularBookmark , faHeart as faHeartRegular , faThumbsDown as faThumbsDownRegular, faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';  // Import the type
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight,faHeart as faHeartSolid, faThumbsDown as faThumbsDownSolid , faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-Coupon',
  templateUrl: './Coupon.component.html',
  styles: []
})
export class CouponComponent implements OnInit {
  @Input() couponDetails!: AdvertisementDetails;
  // baseUrl="https://images.spreezy.in/";
  baseUrl="";
  remainingDays: number;
  isExpired: boolean = false;
  reportVisible: boolean = false;
  showReportButton: boolean = false;
  remainingHours: number;
  scaleAnimation: boolean = false; 
  showLikeAnimation: boolean = false; 
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false; 
  showSavedMessage: boolean = false; 
  copyButtonText: string = 'Copy';
  showReportSuccess: boolean = false; 
  showPopup: boolean = false;
  popupTitle: string = 'Error';
  popupBody: string = '';
  faBars: IconDefinition = faBars;
  faUserGroup: IconDefinition = faUserGroup;
  solidBookmark: IconDefinition = solidBookmark; 
  regularBookmark: IconDefinition = regularBookmark; 
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faThumbsUp: IconDefinition = faThumbsUp;
  faThumbsDown: IconDefinition = faThumbsDown;
  faLocationArrow: IconDefinition = faLocationArrow;
  faEllipsisVertical: IconDefinition = faEllipsisVertical;
  faLocationDot: IconDefinition = faLocationDot;
  faHeart: IconDefinition = faHeart;
  faBell: IconDefinition = faBell;
  faBookmark : IconDefinition = faBookmark;
  faBookmarkRegular : IconDefinition = faBookmarkRegular;
  faCircleUser : IconDefinition = faCircleUser;
  faPaperPlane : IconDefinition = faPaperPlane;
  showBelow = false;

  faThumbsUpOutline: IconDefinition = faThumbsUpOutline;
  faThumbsDownOutline: IconDefinition = faThumbsDownOutline;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  currentImageIndex = 0;
  translateX = 0;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChild('threeDotsWrapper', { static: false }) threeDotsRef!: ElementRef;
  isLiked: boolean = false; 
  isDisliked: boolean = false; 

  constructor(private advertisementDetailsService: AdvertisementDetailsService,private router:Router) {}

  ngOnInit(): void {
    try {
      const { remainingDays, remainingHours, isExpired } = this.advertisementDetailsService.calculateExpiry(this.couponDetails.offerExpiry);
      this.remainingDays = remainingDays;
      this.remainingHours = remainingHours;
      this.isExpired = isExpired;
    } catch (error) {
      console.error('Error calculating expiry:', error);
    }
  }

  likePost(): void {
    const advertisementId = this.couponDetails.advertisementId;
    this.triggerAnimation('like');

    if (!this.isLiked) {
      this.isLiked = true;
      this.isDisliked = false;
      this.couponDetails.likes += 1;

      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.couponDetails.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        },
      });
    } else {
      this.isLiked = false;
      this.couponDetails.likes -= 1;
      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.couponDetails.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        },
      });
    }
  }

  dislikePost(): void {
    const advertisementId = this.couponDetails.advertisementId;
    this.triggerAnimation('dislike');

    if (!this.isDisliked) {
      this.isDisliked = true;
      this.isLiked = false;
      this.couponDetails.dislikes += 1;

      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.couponDetails.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
        },
      });
    } else {
      this.isDisliked = false;
      this.couponDetails.dislikes -= 1;
      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.couponDetails.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
        },
      });
    }
  }

  sharePost(){}

  savePost(): void {
    const advertisementId = this.couponDetails.advertisementId;
    const username = this.couponDetails.username;
    this.triggerAnimation('save');
    this.scaleAnimation = true;
    setTimeout(() => {
      this.scaleAnimation = false;
    }, 500);
    this.isSaved = !this.isSaved; 
    this.advertisementDetailsService.savePost(username, advertisementId).subscribe({
      next: (response) => {
        console.log('Post saved successfully:', response);
      },
      error: (err) => {
        this.showError('Save Error', 'Failed to save the post. Please try again.');
        this.isSaved = !this.isSaved; 
      },
    });
  }

  copyToClipboard(couponCode: string): void {
    console.log(this.couponDetails)
    console.log(couponCode)
    navigator.clipboard.writeText(couponCode).then(() => {
      this.copyButtonText = 'Copied';
      setTimeout(() => {
        this.copyButtonText = 'Copy';
      }, 2000);
    }).catch(err => {
      this.showError('Copy Error', 'Failed to copy coupon code. Please try again.');
    });
  }

  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
  }

  toggleReportButton(): void {
    this.showReportButton = !this.showReportButton;
    if (this.showReportButton) {
      this.determinePopupPosition();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const triggerPoint = 135; 
    this.showBelow = window.scrollY < triggerPoint;
    if (this.showReportButton) {
      this.determinePopupPosition();
    }
  }

  determinePopupPosition(): void {
    if (!this.threeDotsRef) return;
    const rect = this.threeDotsRef.nativeElement.getBoundingClientRect();
    const safeTopLimit = 135; 
    this.showBelow = rect.top < safeTopLimit;
  }

  getReportPopupStyle() {
    return this.showBelow
      ? { top: '2.5rem', bottom: 'auto' } 
      : { bottom: '2.5rem', top: 'auto' };
  }

  reportPost(): void {
    this.advertisementDetailsService.reportPost(this.couponDetails.advertisementId).subscribe({
      next: (response) => {
        console.log('Post reported successfully:', response);
        this.showReportSuccess = true;
        this.showReportButton = false;
      },
      error: (err) => {
        this.showError('Report Error', 'Failed to Report the post. Please try again.');
      },
    });
    document.body.style.overflow = 'hidden';
  }

  hideReportSuccess(): void {
    this.showReportSuccess = false; 
    document.body.style.overflow = 'auto';  
  }

  private triggerAnimation(type: 'like' | 'dislike' | 'save') {
    if (type === 'like') {
      this.showLikeAnimation = true;
    } else if (type === 'dislike') {
      this.showDislikeAnimation = true;
    }
    setTimeout(() => {
      this.showLikeAnimation = false;
      this.showDislikeAnimation = false;
    }, 500); 
  }

  showDetails(advertisementId: number): void {
    this.router.navigate(['consumer-home/adfeed/offer-description', advertisementId ] ,  {
      queryParams: { data: JSON.stringify(this.couponDetails) },
    });
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateTranslateX();
    }
  }
  
  nextImage() {
    if (this.couponDetails.imagePaths && this.currentImageIndex < this.couponDetails.imagePaths.length - 1) {
      this.currentImageIndex++;
      this.updateTranslateX();
    }
  }
  
  goToImage(index: number) {
    if (this.couponDetails.imagePaths && index >= 0 && index < this.couponDetails.imagePaths.length) {
      this.currentImageIndex = index;
      this.updateTranslateX();
    }
  }
  
  updateTranslateX() {
    const containerWidth = this.imageContainer?.nativeElement?.clientWidth || 0;
    this.translateX = -this.currentImageIndex * containerWidth;
  }
  
  @HostListener('window:resize')
  onResize() {
    this.updateTranslateX();
  }
  
  startX: number;
  
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }
  
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    const diff = endX - this.startX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.prevImage();
      } else {
        this.nextImage();
      }
    }
  }
  
}