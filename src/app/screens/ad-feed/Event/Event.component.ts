// src/app/components/post-event/post-event.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faBookmark, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
@Component({
  selector: 'app-Event',
  templateUrl: './Event.component.html',
  styleUrls: [] // Add if you have a CSS file
})
export class EventComponent implements OnInit {
  @Input() eventDetails!:AdvertisementDetails;

  remainingDays: number;
  remainingHours: number;
  isExpired: boolean = false;
  reportVisible: boolean = false; // Property to control visibility of report modal
  showReportButton: boolean = false;
  showReportSuccess: boolean = false; 
  showLikeAnimation: boolean = false; 
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false; // Track saved state
  showSavedMessage: boolean = false; // Track the display of "Saved" message
  
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
  faThumbsUpOutline = faThumbsUpOutline;
  faThumbsDownOutline = faThumbsDownOutline;

  // Track like/dislike state
  isLiked: boolean = false; // State for like
  isDisliked: boolean = false; // State for dislike

  constructor(private advertisementDetailsService: AdvertisementDetailsService) {}

  
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
    this.showSavedMessage = true;

    setTimeout(() => {
      this.showSavedMessage = false;
    }, 500);

    this.advertisementDetailsService.savePost(username, advertisementId).subscribe({
      next: (response) => {
        console.log('Post saved successfully:', response);
        this.isSaved = true;
      },
      error: (err) => {
        this.showError('Save Error', 'Failed to save the post. Please try again.');
        
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
    // Replace the URL with the website you want to redirect to
    window.location.href = 'https://www.example.com';
  }


}
