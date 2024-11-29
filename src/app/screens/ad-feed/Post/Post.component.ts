import { Component, Input, OnInit } from '@angular/core';

import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Post',
  templateUrl: './Post.component.html',
  styles: []
})
export class PostComponent implements OnInit {
  @Input() postDetails!: AdvertisementDetails;
  remainingDays: number;
  remainingHours: number;
  isExpired: boolean = false;
  showLikeAnimation: boolean = false; 
  scaleAnimation:boolean=false;
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false; // Track saved state
  showSavedMessage: boolean = false; // Track the display of "Saved" message
  showReportButton: boolean = false; // Track visibility of report button
  showReportSuccess: boolean = false; // Track visibility of success message
  advertisementId: number;
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
  solidBookmark = solidBookmark; // Solid bookmark icon
  regularBookmark = regularBookmark; // Regular bookmark icon
  faEllipsisVertical = faEllipsisVertical;
  faLocationDot = faLocationDot;
  faHeart = faHeart;
  faBell = faBell;
  faCircleUser = faCircleUser;

  // Outlined icons
  faThumbsUpOutline = faThumbsUpOutline;
  faThumbsDownOutline = faThumbsDownOutline;

  // Track like/dislike state
  isLiked: boolean = false; // State for like
  isDisliked: boolean = false; // State for dislike

  constructor(private advertisementDetailsService: AdvertisementDetailsService ,private router:Router) {
    this.advertisementId = this.postDetails.advertisementId;
  }

  ngOnInit(): void {
    const { remainingDays, remainingHours, isExpired } = this.advertisementDetailsService.calculateExpiry(this.postDetails.offerExpiry);
    this.remainingDays = remainingDays;
    this.remainingHours = remainingHours;
    this.isExpired = isExpired;
  }

  likePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    this.triggerAnimation('like');

    if (!this.isLiked) {
      this.isLiked = true;
      this.isDisliked = false;
      this.postDetails.likes += 1;

      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.postDetails.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
         
        },
      });
    } else {
      this.isLiked = false;
      this.postDetails.likes -= 1;
      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.postDetails.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
          
        },
      });
    }
  }

  dislikePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    this.triggerAnimation('dislike');

    if (!this.isDisliked) {
      this.isDisliked = true;
      this.isLiked = false;
      this.postDetails.dislikes += 1;

      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.postDetails.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
          
        },
      });
    } else {
      this.isDisliked = false;
      this.postDetails.dislikes -= 1;
      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.postDetails.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
         
        },
      });
    }
  }

  savePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    const username = this.postDetails.username;
  
    // Trigger the save animation
    this.triggerAnimation('save');
  
    // Add scaling effect
    this.scaleAnimation = true;
  
    // Reset the scaling effect after 500ms
    setTimeout(() => {
      this.scaleAnimation = false;
    }, 500);
  
    // Toggle the saved state whenever the icon is clicked
    this.isSaved = !this.isSaved;  // This will toggle the state between saved and not saved
  
    this.advertisementDetailsService.savePost(username, advertisementId).subscribe({
      next: (response) => {
        console.log('Post saved successfully:', response);
        // If needed, handle any success logic here. For example, you might want to show a success message.
      },
      error: (err) => {
        // In case of error, show the error message and revert the saved state
        this.showError('Save Error', 'Failed to save the post. Please try again.');
        this.isSaved = !this.isSaved; // Revert the saved state if there was an error
      },
    });
  }
  
  // This method will be called when the "Show Details" button is clicked
  showDetails(advertisementId: number): void {
    // Navigate to the offer description or coupon component with the advertisementId
    this.router.navigate(['/offer-description', advertisementId]);
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
  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
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