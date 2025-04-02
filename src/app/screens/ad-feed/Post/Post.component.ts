import { Component, Input, OnInit,Output,EventEmitter} from '@angular/core';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faBookmark, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Post',
  templateUrl: './Post.component.html',
  styles: []
})
export class PostComponent implements OnInit {
  @Input() postDetails!: AdvertisementDetails;
  @Input() index!: number; 
  @Input() activeIndex!: number | undefined; 
  @Input() showInsightScreen!: boolean; 
  @Output() setActiveIndex = new EventEmitter<number>();
  @Output() setInsightScreen = new EventEmitter<Event>(); 
  remainingDays: number;
  remainingHours: number;
  isExpired: boolean = false;
  showLikeAnimation: boolean = false; 
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false; // Track saved state
  showSavedMessage: boolean = false; // Track the display of "Saved" message
  showReportButton: boolean = false; // Track visibility of report button
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
  isLiked: boolean = false; // State for like
  isDisliked: boolean = false; // State for dislike
  showInsightsButton: boolean = false; 
 


  constructor(private advertisementDetailsService: AdvertisementDetailsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const { remainingDays, remainingHours, isExpired } = this.advertisementDetailsService.calculateExpiry(this.postDetails.offerExpiry);
    this.remainingDays = remainingDays;
    this.remainingHours = remainingHours;
    this.isExpired = isExpired;
    this.showInsightsButton = (this.route.snapshot.paramMap.get('username')) ? true : false; 
    if("shares" in this.postDetails == false && "comments" in this.postDetails == false && "engagement" in this.postDetails == false){
      this.showInsightsButton = false; 
    }
  }

  showInsights(val :boolean,event: Event) : void{
    console.log(this.activeIndex,this.index,val); 
    this.showInsightScreen = val; 
    this.setInsightScreen.emit(event);
    this.setActiveIndex.emit(this.index); 
  }

  showInsightComponent(event: Event) {
    if(!this.showInsightScreen){
      return; 
    }
    this.showInsightScreen = false;
    this.setActiveIndex.emit(undefined);
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
          throw(err);
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
          throw(err);
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
         throw(err);
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
          throw(err);
        },
      });
    }
  }

  savePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    const username = this.postDetails.username;

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