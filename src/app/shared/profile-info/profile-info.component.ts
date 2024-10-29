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
    this.router.navigate([`/profile/business/${username}`]);
  }
}
