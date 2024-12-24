import { kycDetails } from "./kycDetails";

export class BusinessDetails {
  ownerName: string = ' ';
  email: string = ' ';
  gender: string = ' ';
  businessName: string = ' ';
  businessUsername: string = ' ';
  businessType: string = 'abc';
  phoneNumber: string = ' ';
  state: string = ' ';
  city: string = ' ';
  pincode: string = ' ';
  bio: string = ' ';
  kycDetails: kycDetails = new kycDetails(); // Proper initialization

  constructor() {
    // Ensure other initializations are handled properly
    this.kycDetails = new kycDetails(); // Initialize `kycDetails` to avoid null references
  }
}