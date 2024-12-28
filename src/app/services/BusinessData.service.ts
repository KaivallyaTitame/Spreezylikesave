import { Injectable } from '@angular/core';
import { BusinessDetails } from '../models/BusinessRegistration/BusinessDetails';

@Injectable({
  providedIn: 'root'
})
export class BusinessData {
  private businessData: BusinessDetails = new BusinessDetails(); // Initialize to avoid null

  constructor() {}

  setBusinessData(data: BusinessDetails) {
    this.businessData = data;
  }

  getBusinessData(): BusinessDetails {
    return this.businessData;
  }
}


