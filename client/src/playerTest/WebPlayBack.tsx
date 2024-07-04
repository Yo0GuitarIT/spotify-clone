import React, { useState, useEffect } from "react";

interface WebPlayBackProps {
  token: string;
}

interface SpotifyPlayer {
  name: string;
  getOAuthToken: (callback: (token: string) => void) => void;
  connect: () => Promise<boolean>;
  addListener: (eventName: string, callback: (data: any) => void) => boolean;
  getCurrentState: () => Promise<any>;
  // 可以根據需要添加更多方法
}

interface PlayerState {
  paused: boolean;
  track_window: {
    current_track: {
      name: string;
      album: {
        images: { url: string }[];
      };
      artists: { name: string }[];
    };
  };
}

declare global {
  interface Window {
    Spotify: {
      Player: new (config: any) => SpotifyPlayer;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

const initialTrack = {
  name: "",
  album: { images: [{ url: "" }] },
  artists: [{ name: "" }],
};

const WebPlayBack: React.FC<WebPlayBackProps> = ({ token }) => {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(initialTrack);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: cb => { cb(token); },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state: PlayerState) => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setIsPaused(state.paused);

        player.getCurrentState().then(state => {
          setIsActive(!!state);
        });
      });

      player.connect();
    };

    return () => {
      document.body.removeChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => {};
    };
  }, [token]);

  if (!isActive) {
    return (
      <div className="container">
        <div className="main-wrapper">
          <b>Instance not active. Transfer your playback using your Spotify app</b>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="main-wrapper">
        <img
          src={currentTrack.album.images[0].url}
          className="now-playing__cover"
          alt={`${currentTrack.name} album cover`}
        />
        <div className="now-playing__side">
          <div className="now-playing__name">{currentTrack.name}</div>
          <div className="now-playing__artist">
            {currentTrack.artists[0].name}
          </div>
          <button className="btn-spotify" onClick={() => { /* 添加切換播放/暫停的邏輯 */ }}>
            {isPaused ? "PLAY" : "PAUSE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebPlayBack;