export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Contributor extends User {
  contributorId: number;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  author: User;
  contributors: Contributor[];
  createdAt: string;
  updatedAt: string;
}

export interface StoryVersion {
  id: number;
  title: string;
  content: string;
  editedAt: string;
  editedBy: User;
}

export interface StoryComment {
  id: number;
  storyId: number;
  content: string;
  author: User;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
