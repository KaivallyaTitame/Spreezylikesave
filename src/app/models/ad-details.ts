export class insights{
  [key:string]:number; 
}

export interface AdvertisementDetails {
    advertisementId: number;
    advertisementType:string;
    profileImageUrl: string;
    username: string;
    offerExpiry: string;
    offerTitle: string;
    offerSubtitle: string;
    likes: number;
    dislikes: number;
    shares: number; 
    reach: number; 
    insights:insights; 
    engagement:number; 
    comments: number; 
    descriptionTitle: string;
    descriptionContent: string;
    howToAvailSteps: string[];
    termsConditions: string[];
    websiteLink:string;
    couponCode:string;
    imagePaths: string[];
    description: string;
    eventDateAndTime:string;
    offerImageUrl:string;
}