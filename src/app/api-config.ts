import { environment } from '../environments/environment.production';

export const API_CONFIG = {
  // Image Service
  IMAGE_URL: 'https://images.spreezy.in',

  // Auth Service Endpoints
  AUTH_LOGOUT: (userName: string) => `${environment.apiGateway}/auth/${userName}/logout`,
  GENERATE_OTP: `${environment.apiGateway}/auth/generate-otp`,
  RESEND_OTP: `${environment.apiGateway}/auth/resend-otp`,
  VERIFY_OTP: `${environment.apiGateway}/auth/verify-otp`,
  RECYCLE_TOKEN : `${environment.apiGateway}/auth/refreshToken`,

  // Business Service Endpoints
  GET_BUSINESS_DETAILS: (username: string) =>
    `${environment.apiGateway}/user/profile/${username}`,
  GET_PROFILE_POSTS: (username: string) =>
    `${environment.apiGateway}/feed/business/profile/${username}`,
  GET_SAVED_POSTS: (username: string) =>
    `${environment.apiGateway}/feed/saved/${username}`,

  // Feedback Service Endpoints
  SAVE_FEEDBACK: `${environment.apiGateway}/feedback/saveFeedback`,

  // Search Service Endpoints
  SEARCH_BUSINESSES: (query: string) => `${environment.apiGateway}/user/search/${query}`,
  FOLLOW_BUSINESS: (sourceUsername: string, targetUsername: string) => 
    `${environment.apiGateway}/user/follow/${sourceUsername}/${targetUsername}`,
  UNFOLLOW_BUSINESS: (sourceUsername: string, targetUsername: string) => 
    `${environment.apiGateway}/user/unfollow/${sourceUsername}/${targetUsername}`,

  // Settings Service Endpoints
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
};
