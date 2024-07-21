export interface ApiResponse<T=any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface UserProfileType {
  imageUrl: string;
}

export interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  verifyAuthStatus: () => Promise<void>;
  initiateLogin: () => Promise<void>;
  handleCallback: (loginState: string) => void;
  logoutUser: () => Promise<void>;
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
