import React from "react";
import useSpotify from "./useSpotify";

const usePlayer = () => {
  const [player, setPlayer] = React.useState<Spotify.Player>();
  const [deviceId, setDeviceId] = React.useState<string>();
  const spotifyApi = useSpotify();

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(spotifyApi.getAccessToken() as string);
        },
        volume: 0.1,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
      });

      player.connect();
    };
  }, [spotifyApi]);
  return { player, deviceId };
};

export default usePlayer;
