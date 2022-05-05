import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../../atoms/songAtom";
import useSongInfo from "../../../hooks/useSongInfo";
import useSpotify from "../../../hooks/useSpotify";

const defaultSong =
  "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = React.useState(50);

  const songInfo = useSongInfo();
  console.log("song", songInfo);

  return (
    <div>
      {/* left */}
      <div>
        <Image
          src={songInfo?.album?.images[0]?.url || defaultSong}
          className="hidden md:inline"
          height="40"
          width="40"
          alt={songInfo?.name}
        />
      </div>
    </div>
  );
};

export default Player;
