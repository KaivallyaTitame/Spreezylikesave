import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { faArrowLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faTimesCircle = faTimesCircle;
  searchQuery: string = '';
  businesses: { name: string, username: string, profilePicture: string, imageUrl?: string }[] = [];
  private searchSubject = new Subject<string>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    console.log('Search Component Initialized');

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.loadBusinesses(query);
    });
  }

  loadBusinesses(query: string): void {
    console.log('Sending query to backend:', query);
    
    this.searchService.getBusinesses(query).subscribe((data) => {
      console.log('Fetched Businesses:', data);
      this.businesses = data.map(business => ({
        ...business,
        imageUrl: this.searchService.getImageUrl(business.profilePicture)
      }));
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log("Search query:", this.searchQuery);
      this.searchSubject.next(this.searchQuery);
    } else {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    console.log('Search cleared');
    this.businesses = [];
    this.searchInput.nativeElement.focus();
  }

  goBack(): void {
    console.log('Back button clicked');
  }

  onUserClick(username: string): void {
    console.log('Navigating to profile:', username);
    this.router.navigate([`/profile/business/${username}`]);
  }
}
