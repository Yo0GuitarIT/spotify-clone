export interface ApiResponse {
  success: boolean;
  message: string;
  url?: string;
}

export interface IconProps {
  className?: string;
}

export interface NewRelease {
  name: string;
  artist: string;
  albumCoverUrl: string;
}

export interface PersonalizedCardProps {
  release: NewRelease;
}