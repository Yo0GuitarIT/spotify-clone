import { createContext, useState, useEffect, ReactNode } from "react";
import { useSpotifyToken } from "../hooks/useSpotifyToken";
import { connectToSpotify } from "../utils/spotifyUtils";
import { PlayerContextType } from "../types/types";

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

function PlayerProvider({ children }: { children: ReactNode }) {
  const { token, isLoading, error } = useSpotifyToken();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [playbackState, setPlaybackState] =
    useState<Spotify.PlaybackState | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null);
  const [volume, setVolume] = useState(85);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotify Clone Player",
        getOAuthToken: (cb) => cb(token),
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
        connectToSpotify(token, device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (state) {
          setPlaybackState(state);
          setIsPlaying(!state.paused);
          setCurrentTrack(state.track_window.current_track);
        }
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error("Failed to initialize", message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error("Failed to validate Spotify account", message);
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    };

    return () => {
      player?.disconnect();
    };
  }, [token]);

  const play = async () => {
    try {
      await player?.resume();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to play:", error);
    }
  };

  const pause = async () => {
    try {
      await player?.pause();
      setIsPlaying(false);
    } catch (error) {
      console.error("Failed to pause:", error);
    }
  };

  const nextTrack = async () => {
    try {
      await player?.nextTrack();
      // 可能需要更新當前曲目信息
      updatePlaybackState();
    } catch (error) {
      console.error("Failed to skip to next track:", error);
    }
  };

  const previousTrack = async () => {
    try {
      await player?.previousTrack();
      // 可能需要更新當前曲目信息
      updatePlaybackState();
    } catch (error) {
      console.error("Failed to go to previous track:", error);
    }
  };

  const updatePlaybackState = async () => {
    const state = await player?.getCurrentState();
    if (state) {
      setPlaybackState(state);
      setIsPlaying(!state.paused);
      setCurrentTrack(state.track_window.current_track);
    }
  };

  const handleVolumeChange = async (newVolume: number) => {
    try {
      await player?.setVolume(newVolume / 100);
      setVolume(newVolume);
    } catch (error) {
      console.error("Failed to set volume:", error);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        token,
        isLoading,
        error,
        player,
        playbackState,
        deviceId,
        isPlaying,
        currentTrack,
        volume,
        play,
        pause,
        nextTrack,
        previousTrack,
        setVolume: handleVolumeChange,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
