import { kycDetails } from "./kycDetails";

export class BusinessDetails {
  ownerName: string = ' ';
  email: string = ' ';
  gender: string = ' ';
  businessName: string = ' ';
  businessUsername: string = ' ';
  businessType: string = '';
  phoneNumber: string = ' ';
  state: string = ' ';
  city: string = ' ';
  pincode: string = ' ';
  bio: string = ' ';
  kycDetails: kycDetails = new kycDetails(); 
}