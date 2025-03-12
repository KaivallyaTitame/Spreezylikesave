
import { Component, Input, OnInit } from '@angular/core';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Event',
  templateUrl: './Event.component.html',
  styleUrls: [] 
})
export class EventComponent implements OnInit {
  @Input() eventDetails!:AdvertisementDetails;
  // baseUrl="https://images.spreezy.in/";
  baseUrl="";
  remainingDays: number;
  remainingHours: number;
  isExpired: boolean = false;
  reportVisible: boolean = false; 
  showReportButton: boolean = false;
  showReportSuccess: boolean = false; 
  showLikeAnimation: boolean = false; 
  showDislikeAnimation: boolean = false;
  scaleAnimation:boolean=false;
  isSaved: boolean = false; 
  showSavedMessage: boolean = false; 
  showPopup: boolean = false;
  popupTitle: string = 'Error';
  popupBody: string = '';
   faBars = faBars;
   faUserGroup = faUserGroup;
   faMagnifyingGlass = faMagnifyingGlass;
   faThumbsUp = faThumbsUp;
   faThumbsDown = faThumbsDown;
   faLocationArrow = faLocationArrow;
   solidBookmark = solidBookmark; 
   regularBookmark = regularBookmark;
   faEllipsisVertical = faEllipsisVertical;
   faLocationDot = faLocationDot;
   faHeart = faHeart;
   faBell = faBell;
   faCircleUser = faCircleUser;
  faThumbsUpOutline = faThumbsUpOutline;
  faThumbsDownOutline = faThumbsDownOutline;
  isLiked: boolean = false;
  isDisliked: boolean = false; 
  constructor(private advertisementDetailsService: AdvertisementDetailsService,private router:Router) {}

  ngOnInit(): void {
    const { remainingDays, remainingHours, isExpired } = this.advertisementDetailsService.calculateExpiry(this.eventDetails.offerExpiry);
    this.remainingDays = remainingDays;
    this.remainingHours = remainingHours;
    this.isExpired = isExpired;
  }

  likePost(): void {
    const advertisementId = this.eventDetails.advertisementId;
    this.triggerAnimation('like');
    if (!this.isLiked) {
      this.isLiked = true;
      this.isDisliked = false;
      this.eventDetails.likes += 1;
      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.eventDetails.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        },
      });
    } else {
      this.isLiked = false;
      this.eventDetails.likes -= 1;
      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.eventDetails.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        },
      });
    }
  }

  dislikePost(): void {
    const advertisementId = this.eventDetails.advertisementId;
    this.triggerAnimation('dislike');
    if (!this.isDisliked) {
      this.isDisliked = true;
      this.isLiked = false;
      this.eventDetails.dislikes += 1;
      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.eventDetails.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
        },
      });
    } else {
      this.isDisliked = false;
      this.eventDetails.dislikes -= 1;
      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.eventDetails.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
        },
      });
    }
  }

  savePost(): void {
    const advertisementId = this.eventDetails.advertisementId;
    const username = this.eventDetails.username;
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
        this.showError('Save Error', 'Failed to save the post. Please try again.' + err);
        this.isSaved = !this.isSaved; 
      },
    });
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

  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
  }
   
  bookNow(): void {
    window.location.href = this.eventDetails.websiteLink;
  }
  
  showDetails(advertisementId: number): void {
    // console.log("EVENT DETAILS ", this.eventDetails)
    // this.router.navigate(['/offer-description', advertisementId],{ state : { data : this.eventDetails} } );
    this.router.navigate(['/offer-description', advertisementId], {
      queryParams: { data: JSON.stringify(this.eventDetails) },
    });
  }
}
