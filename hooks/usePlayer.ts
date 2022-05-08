import React from "react";
import { useRecoilState } from "recoil";
import { playerAtom } from "../atoms/playerAtom";
import { volumeAtom } from "../atoms/volumeAtom";
import useSpotify from "./useSpotify";

const usePlayer = () => {
  const [player, setPlayer] = useRecoilState(playerAtom);
  const [deviceId, setDeviceId] = React.useState<string>();
  const [volume, _setVolume] = useRecoilState(volumeAtom);
  const spotifyApi = useSpotify();

  React.useEffect(() => {
    console.log("in");

    if (!player) {
      setPlayer(
        new Spotify.Player({
          name: "Spoticlone",
          getOAuthToken: (cb: (token: string) => void) => {
            cb(spotifyApi.getAccessToken() as string);
          },
        })
      );
      console.log(player);

      player!.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
      });
      player!.connect();
    }
    return () => {
      player!.disconnect();
      player!.removeListener("ready");
    };
  }, [player, setPlayer, spotifyApi, volume]);

  return { player, deviceId };
};

export default usePlayer;
