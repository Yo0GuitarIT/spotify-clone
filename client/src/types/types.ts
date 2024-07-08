export interface ApiResponse {
  success: boolean;
  message: string;
  url?: string;
}

export interface IconProps {
  className?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  initateLogin: () => Promise<void>;
  handleCallback: (accessToken: string) => void;
  logoutUser: () => Promise<void>;
  verifyAuthStatus: () => Promise<void>;
}

export namespace SpotifyProps {
  export interface Player {
    pause: () => void;
    resume: () => void;
    // Add other player methods as needed
  }

  export interface PlaybackState {
    paused: boolean;
    track_window: {
      current_track: {
        name: string;
        artists: Array<{ name: string }>;
        album: {
          name: string;
          images: Array<{ url: string }>;
        };
      };
    };
    // Add other playback state properties as needed
  }
}
