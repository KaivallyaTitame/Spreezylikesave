import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
})
export class ProfileInfoComponent {
  @Input() name!: string;
  @Input() username!: string;
  @Input() imageUrl!: string;

  constructor(private router: Router) { }

  onProfileClick(username: string): void {
    console.log('Navigating to profile:', username);
    this.router.navigate([`/consumer-home/profile/business-profile/${username}`]); //as of now its kept on consumer
  }
}
