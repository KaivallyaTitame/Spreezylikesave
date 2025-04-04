import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faBookmark, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Coupon',
  templateUrl: './Coupon.component.html',
  styles: []
})
export class CouponComponent implements OnInit {
  @Input() couponDetails!: AdvertisementDetails;
  @Input() index!: number; // index of the post get from for loop.
  @Input() activeIndex!: number | undefined; // it is used to indicate which post's insight is actively visible. 
  @Output() setActiveIndex = new EventEmitter<number>();  // it is the methood from business profile component which sets the value of activeIndex variable which is used to indicate the post whoes insights are showing. 
  @Output() setInsightScreen = new EventEmitter<Event>(); // this methood is from business profile compoennt which  is used to set the boolean variable whether to show the post insight or not. 
  @Input() showButton !:boolean; // this parameter comes from business profile component which is used to track the visibility of the show insight button. 

  remainingDays: number;
  isExpired: boolean = false;
  reportVisible: boolean = false; // Property to control visibility of report modal
  showReportButton: boolean = false;
  remainingHours: number;

  showLikeAnimation: boolean = false; 
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false; // Track saved state
  showSavedMessage: boolean = false; // Track the display of "Saved" message
  copyButtonText: string = 'Copy';
  showReportSuccess: boolean = false; // Track visibility of success message

  showPopup: boolean = false;
  popupTitle: string = 'Error';
  popupBody: string = '';

  // Font Awesome icons
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

  // Outlined icons
  faThumbsUpOutline = faThumbsUpOutline;
  faThumbsDownOutline = faThumbsDownOutline;

  // Track like/dislike state
  isLiked: boolean = false; 
  isDisliked: boolean = false; 
  constructor(private advertisementDetailsService: AdvertisementDetailsService,private route: ActivatedRoute) {}

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
  
  // on Clicking the show insight button below methood get executed. 
  showInsights(event: Event) : void{
    this.setActiveIndex.emit(this.index); 
    // it first sets the selected post insight data into the component. 
    // hence it is accepting the index as a parameter for asking which post insight should be shown.
    this.setInsightScreen.emit(event);
    // after setting the data it will change the value of the insight component and making it visible.
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
          throw(err);
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
          throw(err);
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
          throw(err);
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
          throw(err);
        },
      });
    }
  }

  savePost(): void {
    const advertisementId = this.couponDetails.advertisementId;
    const username = this.couponDetails.username;

    this.triggerAnimation('save');
    this.showSavedMessage = true;

    setTimeout(() => {
      this.showSavedMessage = false;
    }, 500);

    this.advertisementDetailsService.savePost(username, advertisementId).subscribe({
      next: (response) => {
        this.isSaved = true;
      },
      error: (err) => {
        throw(err);
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
      throw(err);
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
