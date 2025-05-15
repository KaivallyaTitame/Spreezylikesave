import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart as faHeartRegular, faThumbsDown as faThumbsDownOutline, faThumbsUp as faThumbsUpOutline, faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBars, faBell, faChevronLeft, faChevronRight, faCircleUser, faEllipsisVertical, faHeart as faHeartSolid, faLocationArrow, faLocationDot, faMagnifyingGlass, faPaperPlane, faThumbsDown, faThumbsUp, faUserGroup, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { ShareAddService } from 'src/app/services/share-add.service';

@Component({
  selector: 'app-Post',
  templateUrl: './Post.component.html',
  styles: []
})
export class PostComponent implements OnInit {
  @Input() postDetails!: AdvertisementDetails;
  baseUrl="https://images.spreezy.in";
  @Input() index!: number;  // index of the post get from for loop.  
  @Input() activeIndex!: number | undefined; // it is used to indicate which post's insight is actively visible. 
  @Output() setActiveIndex = new EventEmitter<number>(); // it is the methood from business profile component which sets the value of activeIndex variable which is used to indicate the post whoes insights are showing. 
  @Output() setInsightScreen = new EventEmitter<Event>(); // this methood is from business profile compoennt which  is used to set the boolean variable whether to show the post insight or not. 
  @Input() showButton !:boolean; // this parameter comes from business profile component which is used to track the visibility of the show insight button. 
  remainingDays: number;
  remainingHours: number;
  isExpired: boolean = false;
  showLikeAnimation: boolean = false;
  scaleAnimation: boolean = false;
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false;
  showSavedMessage: boolean = false;
  showReportButton: boolean = false;
  showReportSuccess: boolean = false;

  showPopup: boolean = false;
  popupTitle: string = 'Error';
  popupBody: string = '';
  faBars = faBars;
  faHeartSolid = faHeartSolid
  faHeartRegular = faHeartRegular;
  faPaperPlane = faPaperPlane;
  faUserGroup = faUserGroup;
  faMagnifyingGlass = faMagnifyingGlass;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faLocationArrow = faLocationArrow;
  solidBookmark = solidBookmark;
  regularBookmark = regularBookmark;
  faEllipsisVertical = faEllipsisVertical;
  faLocationDot = faLocationDot;
  faBell = faBell;
  faCircleUser = faCircleUser;
  faThumbsUpOutline = faThumbsUpOutline;
  faThumbsDownOutline = faThumbsDownOutline;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  isFollowing: boolean = false;
  showBelow = false;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  currentImageIndex = 0;
  translateX = 0;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChild('threeDotsWrapper', { static: false }) threeDotsRef!: ElementRef;
  constructor(private advertisementDetailsService: AdvertisementDetailsService, private router: Router, private jwtDecoderService: JwtDecoderService , private route: Router , private shareService : ShareAddService) { }

  hasValidImages: boolean = true;
  handleImageError(event: any): void {
    this.hasValidImages = false;
    event.target.classList.add('min-h-48');
  }

  ngOnInit(): void {
    const { remainingDays, remainingHours, isExpired } = this.advertisementDetailsService.calculateExpiry(this.postDetails.offerExpiry);

    console.log("POST DETAILS", this.postDetails)


    console.log("POST DETAILS", this.postDetails)

    this.remainingDays = remainingDays;
    this.remainingHours = remainingHours;
    this.isExpired = isExpired;
    this.checkIfFollowing();
  }

  navigateToProfile(){
    console.log(this.router.url)
    if(this.router.url == "/business-home/adfeed"){
      this.router.navigate(['/profile-screen/business-profile',this.postDetails.username])
    }else{
      this.router.navigate(['/profile-screen/consumer-profile',this.postDetails.username])
    }
  }

  toggleFollow(): void {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const sourceUsername = userName || 'currentUser';  
    const targetUsername = this.postDetails.username;
    if (this.isFollowing) {
      this.advertisementDetailsService.unfollowUser(sourceUsername, targetUsername).subscribe(
        (response) => {
          console.log('Unfollowed successfully:', response);
          this.isFollowing = false;
        },
        (error) => {
          console.error('Error unfollowing:', error);
        }
      );
    } else {
      this.advertisementDetailsService.followUser(sourceUsername, targetUsername).subscribe(
        (response) => {
          console.log('Followed successfully:', response);
          this.isFollowing = true;
        },
        (error) => {
          console.error('Error following:', error);
        }
      );
    }
  }

  // Optionally, check if the user is already following
  checkIfFollowing(): void {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const sourceUsername = userName || 'currentUser';
    const targetUsername = this.postDetails.username;
    // Check if the current user is following the post
    // This could involve a service method to check follow status.
    // For simplicity, we're assuming this logic is already in place.
    this.isFollowing = false;  // Replace this with actual check
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
    const advertisementId = this.postDetails.advertisementId;
    this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
      next: (response) => {
        this.triggerAnimation('like');
        const status = response.status;
        if (status == 201) {
          this.isLiked = true;
          this.isDisliked = false;
          this.postDetails.likes += 1;
        } else if (status == 200) {
          this.isLiked = true;
          this.isDisliked = false;
          this.postDetails.likes += 1;
          this.postDetails.dislikes -= 1;
        } 
      },
      error: (error) => {
        console.log(error.status)
        if(error.status == 409){
          this.isLiked = true,
          this.isDisliked = false
        }else{
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        }
      },
    });
  }
  
  dislikePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
      next: (response) => {
        this.triggerAnimation('dislike');
        const status = response.status;
        if (status === 201) {
          this.isDisliked = true;
          this.isLiked = false;
          this.postDetails.dislikes += 1;
        } else if (status === 200) {
          this.isDisliked = true;
          this.isLiked = false;
          this.postDetails.dislikes += 1;
          this.postDetails.likes -= 1;
        } 
      },
      error: (error) => {
        console.log(error.status)
        if (error.status === 409) {
          this.isDisliked = true;
          this.isLiked = false;
        }else{
          this.showError('Dislike Error', 'Failed to update dislike. Please try again.');
        }
      },
    });
  }
  
  savePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    const username = this.postDetails.username;
    console.log(advertisementId , username)
    this.triggerAnimation('save');
    this.scaleAnimation = true;
    this.scaleAnimation = true;
    setTimeout(() => {
      this.scaleAnimation = false;
      this.scaleAnimation = false;
    }, 500);
    this.isSaved = !this.isSaved;
    this.isSaved = !this.isSaved;
    this.advertisementDetailsService.savePost(username, advertisementId).subscribe({
      next: (response) => {
        console.log('Post saved successfully:', response);
      },
      error: (err) => {
        console.log(err)
        this.showError('Save Error', 'Failed to save the post. Please try again.');
        this.isSaved = !this.isSaved;
      },
    });
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

  sharePost(){
    this.shareService.shareContent(this.postDetails);
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
    this.advertisementDetailsService.reportPost(this.postDetails.advertisementId).subscribe({
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
    this.advertisementDetailsService.reportPost(this.postDetails.advertisementId).subscribe({
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

  showDetails(advertisementId: number): void {
    this.router.navigate([`${this.router.url}/offer-description`, advertisementId], {
      queryParams: { data: JSON.stringify(this.postDetails) },
    })
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateTranslateX();
    }
  }
  
  nextImage() {
    if (this.postDetails.imagePaths && this.currentImageIndex < this.postDetails.imagePaths.length - 1) {
      this.currentImageIndex++;
      this.updateTranslateX();
    }
  }

  goToImage(index: number) {
    if (this.postDetails.imagePaths && index >= 0 && index < this.postDetails.imagePaths.length) {
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