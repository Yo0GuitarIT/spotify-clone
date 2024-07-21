// import { createContext, useState, useEffect, ReactNode } from "react";
// import { useSpotifyToken } from "../hooks/useSpotifyToken";
// import { connectToSpotify } from "../services/spotifyUtils";
// import { PlayerContextType } from "../types/types";

// export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// function PlayerProvider({ children }: { children: ReactNode }) {
//   const { token, isLoading, error: tokenError } = useSpotifyToken();

//   const [player, setPlayer] = useState<Spotify.Player | null>(null);
//   const [playbackState, setPlaybackState] =
//     useState<Spotify.PlaybackState | null>(null);
//   const [deviceId, setDeviceId] = useState<string | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null);
//   const [volume, setVolume] = useState(85);
//   const [isMuted, setIsMuted] = useState(false);
//   const [previousVolume, setPreviousVolume] = useState(85);
//   const [playerError, setPlayerError] = useState<Error | null>(null);

//   const handlePlayerError = (error: Error) => {
//     console.error(error);
//     setPlayerError(error);
//   };

//   useEffect(() => {
//     if (!token) return;

//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;

//     document.body.appendChild(script);

//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const player = new window.Spotify.Player({
//         name: "Spotify Clone Player",
//         getOAuthToken: (cb) => cb(token),
//       });

//       setPlayer(player);

//       player.addListener("ready", ({ device_id }) => {
//         console.log("Ready with Device ID", device_id);
//         setDeviceId(device_id);
//         connectToSpotify(token, device_id);
//       });

//       player.addListener("player_state_changed", (state) => {
//         if (state) {
//           setPlaybackState(state);
//           setIsPlaying(!state.paused);
//           setCurrentTrack(state.track_window.current_track);
//         }
//       });

//       player.addListener("initialization_error", ({ message }) => {
//         console.error("Failed to initialize", message);
//       });

//       player.addListener("authentication_error", ({ message }) => {
//         console.error("Failed to authenticate", message);
//       });

//       player.addListener("account_error", ({ message }) => {
//         console.error("Failed to validate Spotify account", message);
//       });

//       player.addListener("initialization_error", ({ message }) => {
//         handlePlayerError(new Error(`Failed to initialize: ${message}`));
//       });

//       player.addListener("authentication_error", ({ message }) => {
//         handlePlayerError(new Error(`Failed to authenticate: ${message}`));
//       });

//       player.addListener("account_error", ({ message }) => {
//         handlePlayerError(
//           new Error(`Failed to validate Spotify account: ${message}`)
//         );
//       });

//       player.connect().then((success) => {
//         if (success) {
//           console.log(
//             "The Web Playback SDK successfully connected to Spotify!"
//           );
//         }
//       });
//     };

//     return () => {
//       player?.disconnect();
//     };
//   }, [token]);

//   const play = async () => {
//     try {
//       await player?.resume();
//       setIsPlaying(true);
//     } catch (error) {
//       handlePlayerError(
//         error instanceof Error ? error : new Error("Failed to play")
//       );
//     }
//   };

//   const pause = async () => {
//     try {
//       await player?.pause();
//       setIsPlaying(false);
//     } catch (error) {
//       handlePlayerError(
//         error instanceof Error ? error : new Error("Failed to pause")
//       );
//     }
//   };

//   const nextTrack = async () => {
//     try {
//       await player?.nextTrack();
//       // 可能需要更新當前曲目資料
//       updatePlaybackState();
//     } catch (error) {
//       handlePlayerError(
//         error instanceof Error ? error : new Error("Failed to next track")
//       );
//     }
//   };

//   const previousTrack = async () => {
//     try {
//       await player?.previousTrack();
//       // 可能需要更新當前曲目資料
//       updatePlaybackState();
//     } catch (error) {
//       handlePlayerError(
//         error instanceof Error ? error : new Error("Failed to prevoius track")
//       );
//     }
//   };

//   const updatePlaybackState = async () => {
//     const state = await player?.getCurrentState();
//     if (state) {
//       setPlaybackState(state);
//       setIsPlaying(!state.paused);
//       setCurrentTrack(state.track_window.current_track);
//     }
//   };

//   const handleVolumeChange = async (newVolume: number) => {
//     try {
//       await player?.setVolume(newVolume / 100);
//       setVolume(newVolume);
//       if (newVolume > 0 && isMuted) {
//         setIsMuted(false);
//       } else if (newVolume === 0 && !isMuted) {
//         setIsMuted(true);
//       }
//     } catch (error) {
//       handlePlayerError(
//         error instanceof Error ? error : new Error("Failed to set volume")
//       );
//     }
//   };

//   const toggleMute = async () => {
//     try {
//       if (isMuted) {
//         await player?.setVolume(previousVolume / 100);
//         setVolume(previousVolume);
//         setIsMuted(false);
//       } else {
//         setPreviousVolume(volume);
//         await player?.setVolume(0);
//         setVolume(0);
//         setIsMuted(true);
//       }
//     } catch (error) {
//       handlePlayerError(
//         error instanceof Error ? error : new Error("Failed to toggle mute")
//       );
//     }
//   };

//   const contextValue: PlayerContextType = {
//     token,
//     isLoading,
//     tokenError,
//     playerError,
//     player,
//     playbackState,
//     deviceId,
//     isPlaying,
//     currentTrack,
//     volume,
//     isMuted,
//     play,
//     pause,
//     nextTrack,
//     previousTrack,
//     setVolume: handleVolumeChange,
//     toggleMute,
//   };

//   return (
//     <PlayerContext.Provider value={contextValue}>
//       {children}
//     </PlayerContext.Provider>
//   );
// }

// export default PlayerProvider;


// src/contexts/PlayerContext.tsx
import { createContext ,useContext } from "react";
import { PlayerContextType } from "../types/types";

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// export const usePlayerContext = () => {
//   const context = useContext(PlayerContext);
//   if (context === undefined) {
//     throw new Error('usePlayerContext must be used within a PlayerProvider');
//   }
//   return context;
// };