export interface ApiResponse {
  success: boolean;
  message: string;
  data?: string;
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
  tokenError: string | null;  
  playerError: Error | null;  
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
