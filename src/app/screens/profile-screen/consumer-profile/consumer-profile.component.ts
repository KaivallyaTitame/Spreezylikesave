import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-profile.service';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { UserDetails } from 'src/app/models/UserDetails';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consumer-profile',
  templateUrl: './consumer-profile.component.html',
  styleUrls: ['./consumer-profile.component.css']
})
export class ConsumerProfileComponent implements OnInit {
  userDetails: UserDetails | null = null; // User details fetched from backend
  loadingUserDetails: boolean = true; // To show skeletons while data is loading
  @Input() savedPosts!: AdvertisementDetails[];
  visibleSavedPosts: AdvertisementDetails[] = [];
  savedPostPage: number = 0;
  postsPerPage: number = 10;
  loadingSavedPosts: boolean = false;
  faBookmark = faBookmark;
  selectedTab: string = 'saved';
  username: string | null = null;

  showPopup: boolean = false;
  popupTitle: string = 'Error';
  popupBody: string = '';

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      if (this.username) {
        this.fetchUserDetails(this.username);
        this.fetchSavedPosts(this.username, this.savedPostPage);
      }
    });
  }

  fetchUserDetails(username: string) {
    this.loadingUserDetails = true; // Show skeletons during loading
    this.UserService.getUserDetails(username)
      .subscribe({
        next: (data) => {
          if (data.profileImageUrl) {
            data.profileImageUrl = this.UserService.getImageUrl(username, data.profileImageUrl);
          }
          this.userDetails = data;
          this.loadingUserDetails = false; // Hide skeletons after successful fetch
        },
        error: (error) => {
          this.userDetails = null; // Reset user details on error
          this.loadingUserDetails = false; // Stop skeletons even if there's an error
          this.showError('Error fetching profile', 'Please try again later.');
        }
      });
  }

  fetchSavedPosts(username: string, page: number) {
    this.loadingSavedPosts = true;
    this.UserService.getSavedPosts(username, page, this.postsPerPage)
      .subscribe({
        next: (data) => {
          data.forEach(post => {
            if (post.profileImageUrl) {
              post.profileImageUrl = this.UserService.getImageUrl(username, post.profileImageUrl);
            }
            if (post.imagePaths && post.imagePaths.length > 0) {
              post.imagePaths = post.imagePaths.map(imagePath =>
                this.UserService.getImageUrl(username, imagePath)
              );
            }
          });
          this.visibleSavedPosts.push(...data);
          this.loadingSavedPosts = false;
          if (data.length > 0) {
            this.savedPostPage++; // Increment page if there are more posts
          }
        },
        error: (error) => {
          this.loadingSavedPosts = false; // Stop loading spinner on error
          this.showError('Error fetching posts', 'Please check your connection.');
        }
      });
  }

  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
  }

  onScroll(event: any) {
    const scrollContainer = event.target;
    const scrollPosition = scrollContainer.scrollTop + scrollContainer.clientHeight;
    const scrollHeight = scrollContainer.scrollHeight;

    if (scrollPosition >= scrollHeight - 100 && !this.loadingSavedPosts) {
      this.fetchSavedPosts(this.username!, this.savedPostPage); // Load more saved posts
    }
  }
}
