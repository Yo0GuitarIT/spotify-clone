export interface ApiResponse {
  success: boolean;
  message: string;
  url?: string;
}

export interface UserProfileType {
  imageUrl: string;
}

export interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  initiateLogin: () => Promise<void>;
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
  isMuted: boolean;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  toggleMute: () => Promise<void>;
}
