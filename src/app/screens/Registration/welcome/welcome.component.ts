import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent { 

  constructor(private router: Router){ }

  navigatebusiness() {
    this.router.navigate(['/welcome/business1']);
  }  

  navigateconsumer() {
    this.router.navigate(['/welcome/register']);
  }
}
//new changes
