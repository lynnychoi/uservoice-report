export type FeedbackType = 'feedback' | 'idea' | 'error';
export type FeedbackStatus = 'active' | 'resolved';
export type SortOption = 'latest' | 'popular' | 'votes';

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  mimeType: 'image/jpeg' | 'image/png' | 'video/mp4';
  size: number;
}

export interface FeedbackItem {
  id: string;
  type: FeedbackType;
  title: string; // 40자 제한
  content: string; // 500자 제한  
  author: string; // 10자 제한
  files?: MediaFile[]; // 최대 3개 (이미지+영상)
  votes: number;
  status: FeedbackStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoteRecord {
  feedbackId: string;
  userIdentifier: string; // IP 또는 쿠키 ID
  votedAt: Date;
}

export interface AdminSession {
  isLoggedIn: boolean;
  loginTime: Date;
  expiresAt: Date; // 7일 후
}

export interface AppState {
  feedbacks: FeedbackItem[];
  votes: VoteRecord[];
  currentSort: SortOption;
  searchQuery: string;
  adminSession: AdminSession;
  filteredTab: FeedbackType | 'all' | 'resolved';
}

export interface CreateFeedbackForm {
  type: FeedbackType;
  title: string;
  content: string;
  author: string;
  files: File[];
}

export interface AdminCredentials {
  username: string;
  password: string;
}