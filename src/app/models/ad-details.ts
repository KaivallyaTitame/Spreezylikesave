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
    descriptionTitle: string;
    descriptionContent: string;
    howToAvailSteps: string[];
    termsConditions: string[];
    websiteLink:string;
    couponCode:string;
    imagePaths: string[];
    description: string;
    eventDateAndTime:string;
  }