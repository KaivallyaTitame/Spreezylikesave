export interface UserInteractionDTO {
  advertisementId: number;
  username: string;
  isLiked: boolean;
  isDisliked: boolean;
  isSaved: boolean;
  timestamp: string;
}

export interface BulkUserInteractionDTO {
  interactions: UserInteractionDTO[];
}

export interface UserInteractionSyncResponse {
  success: boolean;
  message: string;
  syncedCount: number;
}