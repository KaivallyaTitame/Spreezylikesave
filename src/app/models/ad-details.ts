export class insightDetails{
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
  isFollowing: boolean;  
  insightDetails:insightDetails; 
  descriptionTitle: string;
  descriptionContent: string;
  offerImageUrl:string;
}
