import React from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentTrackId, _setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = React.useState<any>();

  React.useEffect(() => {
    const fetchSongInfo = async () => {
      console.log("trackid", currentTrackId);

      if (currentTrackId) {
        console.log("token", spotifyApi.getAccessToken());

        const trackInfo = await fetch(
          "https://api.spotify.com/v1/tracks/" + currentTrackId,
          {
            headers: {
              Authorization: "Bearer " + spotifyApi.getAccessToken(),
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
      console.log("Trying to fetch", currentTrackId);

      fetchSongInfo();
    };
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
