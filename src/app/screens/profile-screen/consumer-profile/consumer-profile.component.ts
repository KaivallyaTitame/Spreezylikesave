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

export class ConsumerProfileComponent implements OnInit{
  userDetails: UserDetails;
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
    private userService: UserService,
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
    this.userService.getUserDetails(username)
      .subscribe({
        next:(data) => {
          this.userDetails = data;
        },
        error:(error) => {
          this.showError(error, 'Please try again later.');
        }
      });
  }

  fetchSavedPosts(username: string, page: number) {
    this.loadingSavedPosts = true;
    this.userService.getSavedPosts(username, page, this.postsPerPage)
      .subscribe({
        next: (data) => {
          this.visibleSavedPosts.push(...data); // Append new data
          this.loadingSavedPosts = false;
          if (data.length > 0) {
            this.savedPostPage++; // Increment page if there are more posts
          }
        },
        error: (error) => {
          this.showError(error, 'Unable to load saved posts.');
          this.loadingSavedPosts = false;
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
// Properties to store scroll positions for each tab
private scrollPositions: { [key: string]: number } = {
  posts: 0,
  saved: 0,
};

}
