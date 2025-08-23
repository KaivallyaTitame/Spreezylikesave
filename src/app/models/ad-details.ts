export class InsightDetails{
  [key:string]:number; 
}

export interface AdvertisementDetails {
  advertisementId: number;
  advertisementType: string;
  profileImageUrl: string;
  username: string;
  offerExpiry: string;
  promoBadge: string;
  howToAvailSteps: string[];
  termsConditions: string[];
  likes: number;
  dislikes: number;
  description: string;
  imagePaths: string[];
  couponCode: string;
  offerTitle: string;
  websiteLink: string;
  bookingLink: string;
  eventDateAndTime: string
  offerSubtitle: string;
  following: boolean;  
  insightDetails:InsightDetails; 
  descriptionTitle: string;
  descriptionContent: string;
  offerImageUrl:string;
}
