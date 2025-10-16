import { environment } from 'src/environments/environment';

export const API_CONFIG = {
  IMAGE_URL: 'https://images.spreezy.in/',

  PAGE_SIZE : 10,

  REGISTRATION: {
    CONSUMER: `${environment.apiGateway}/user/register-consumer`,
    BUSINESS: `${environment.apiGateway}/user/register-business`,
  },

  AUTH_LOGOUT: (userName: string) => `${environment.apiGateway}/auth/${userName}/logout`,
  GENERATE_OTP: `${environment.apiGateway}/auth/generate-otp`,
  RESEND_OTP: `${environment.apiGateway}/auth/resend-otp`,
  VERIFY_OTP: `${environment.apiGateway}/auth/verify-otp`,
  RECYCLE_TOKEN : `${environment.apiGateway}/auth/refreshToken`,

  GET_BUSINESS_DETAILS: (username: string) =>
    `${environment.apiGateway}/user/profile/${username}`,
  GET_PROFILE_POSTS: (username: string) =>
    `${environment.apiGateway}/feed-on-profile-page/posts-section/${username}`,
  GET_SAVED_POSTS: (username: string) =>
    `${environment.apiGateway}/feed-on-profile-page/saved-section/${username}`,

  SAVE_FEEDBACK: `${environment.apiGateway}/feedback/saveFeedback`,

  SEARCH_BUSINESSES: (query: string) => `${environment.apiGateway}/user/search/${query}`,
  FOLLOW_BUSINESS: (sourceUsername: string, targetUsername: string) => 
    `${environment.apiGateway}/user/follow/${sourceUsername}/${targetUsername}`,
  UNFOLLOW_BUSINESS: (sourceUsername: string, targetUsername: string) => 
    `${environment.apiGateway}/user/unfollow/${sourceUsername}/${targetUsername}`,
  IS_FOLLOWING: (sourceUsername: string, targetUsername: string) =>
  `${environment.apiGateway}/user/isFollowing/${sourceUsername}/${targetUsername}`,

  SETTINGS: {
    GET_CONSUMER_DETAILS: (username: string) =>
      `${environment.apiGateway}/settings/consumer-details/${username}`,
    UPDATE_CONSUMER_DETAILS: `${environment.apiGateway}/settings/update-consumer`,
    GET_BUSINESS_DETAILS: (username: string) =>
      `${environment.apiGateway}/settings/business-details/${username}`,
    UPDATE_BUSINESS_DETAILS: `${environment.apiGateway}/settings/update-business`,
    GENERATE_PRESIGNED_URL: `${environment.apiGateway}/content/generate-presigned-url`,
    GET_IMAGE_LINK: (imageFileName: string,username: string) =>
      `${environment.apiGateway}/settings/get-image/${imageFileName}`,
  },

  POST_CREATION: {
    CREATE_COUPON: `${environment.apiGateway}/content/coupon/create`,
    CREATE_POST: `${environment.apiGateway}/content/post/create`,
    CREATE_EVENT: `${environment.apiGateway}/content/event/create`,
  },

  ADVERTISEMENT_EVENTS:{
    GET_ADVERTISEMENT_DETAILS : (username: string) => `${environment.apiGateway}/advertisement-feed/${username}`,
    GET_ADVERTISEMENT_INSIGHTS : (advertisementId: number) => `${environment.apiGateway}/insights/advertisements/${advertisementId}`,
    UPVOTE_ADVERTISEMENT : (advertisementId: number) =>`${environment.apiGateway}/content/advertisement/upvote/${advertisementId}`,
    DISLIKE_ADVERTISEMENT : (advertisementId: number) =>`${environment.apiGateway}/content/advertisement/downvote/${advertisementId}`,
    SAVE_ADVERTISEMENT : `${environment.apiGateway}/content/advertisement/save`,
    REPORT_ADVERTISEMENT : `${environment.apiGateway}/content/advertisement/report`,
    FOLLOW : (sourceUsername: string, targetUsername: string) => 
      `${environment.apiGateway}/user/follow/${sourceUsername}/${targetUsername}`,
    UNFOLLOW : (sourceUsername: string, targetUsername: string) => 
    `${environment.apiGateway}/user/unfollow/${sourceUsername}/${targetUsername}`,
    ENGAGE : (advertisementId: number) => 
    `${environment.apiGateway}/content/advertisement/engage/${advertisementId}`
  }
};
