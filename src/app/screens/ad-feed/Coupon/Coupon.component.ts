import { Component, Input, OnInit } from '@angular/core';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';  // Import the type

@Component({
  selector: 'app-Coupon',
  templateUrl: './Coupon.component.html',
  styles: []
})
export class CouponComponent implements OnInit {
  @Input() couponDetails!: AdvertisementDetails;

  remainingDays: number;
  isExpired: boolean = false;
  reportVisible: boolean = false; // Property to control visibility of report modal
  showReportButton: boolean = false;
  remainingHours: number;
  scaleAnimation: boolean = false; 
  showLikeAnimation: boolean = false; 
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false; // Track saved state
  showSavedMessage: boolean = false; // Track the display of "Saved" message
  copyButtonText: string = 'Copy';
  showReportSuccess: boolean = false; // Track visibility of success message

  showPopup: boolean = false;
  popupTitle: string = 'Error';
  popupBody: string = '';

  // Font Awesome icons with correct typing
  faBars: IconDefinition = faBars;
  faUserGroup: IconDefinition = faUserGroup;
  solidBookmark: IconDefinition = solidBookmark; // Solid bookmark icon
  regularBookmark: IconDefinition = regularBookmark; // Regular bookmark icon
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faThumbsUp: IconDefinition = faThumbsUp;
  faThumbsDown: IconDefinition = faThumbsDown;
  faLocationArrow: IconDefinition = faLocationArrow;

  faEllipsisVertical: IconDefinition = faEllipsisVertical;
  faLocationDot: IconDefinition = faLocationDot;
  faHeart: IconDefinition = faHeart;
  faBell: IconDefinition = faBell;
  faCircleUser: IconDefinition = faCircleUser;

  // Outlined icons
  faThumbsUpOutline: IconDefinition = faThumbsUpOutline;
  faThumbsDownOutline: IconDefinition = faThumbsDownOutline;

  // Track like/dislike state
  isLiked: boolean = false; 
  isDisliked: boolean = false; 

  constructor(private advertisementDetailsService: AdvertisementDetailsService) {}

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
  }

  reportPost(): void {
    this.showReportSuccess = true;
    this.showReportButton = false; 
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
}
