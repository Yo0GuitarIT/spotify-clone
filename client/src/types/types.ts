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

export interface PlayerContextType {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  player: Spotify.Player | null;
  volume: number;
  playbackState: Spotify.PlaybackState | null;
  deviceId: string | null;
  isPlaying: boolean;
  currentTrack: Spotify.Track | null;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
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
