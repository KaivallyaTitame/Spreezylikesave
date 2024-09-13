import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessNavigationServiceService {

  constructor() { }

  Is_Home:boolean = true
  Is_Insights:boolean = false
  Is_Post:boolean = false;
  Is_Notification:boolean = false;
  Is_Profile:boolean = false;
}
