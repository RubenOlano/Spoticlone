import React from "react";
import { useRecoilState } from "recoil";
import { volumeAtom } from "../atoms/volumeAtom";
import useSpotify from "./useSpotify";

const usePlayer = () => {
  const [player, setPlayer] = React.useState<Spotify.Player>();
  const [deviceId, setDeviceId] = React.useState<string>();
  const [volume, _setVolume] = useRecoilState(volumeAtom);
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
        volume: volume / 100,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        spotifyApi.setClientId(device_id);
        spotifyApi.getMyCurrentPlayingTrack().then((track) => {
          if (track) {
            spotifyApi.transferMyPlayback([device_id]);
          }
        });
      });

      player.connect();
    };
  }, [spotifyApi, volume]);

  return { player, deviceId };
};

export default usePlayer;
