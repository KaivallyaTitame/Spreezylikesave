import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class registerComponent { 

  constructor(private router: Router){ }

  navigatebusiness() {
    this.router.navigate(['/register/business1']);
  }  

  navigateconsumer() {
    this.router.navigate(['/register/consumer']);
  }
}
