import React from "react";
import { useRecoilValue } from "recoil";
import { likedSongState } from "../../../atoms/likedAtom";
import Song from "../LikedSong/LikedSong";

const Songs = () => {
  const playlist = useRecoilValue(likedSongState);
  return (
    <div className="text-white px-8 flex-col space-y-1 pb-28">
      {playlist.map((track, i) => (
        <Song key={track.id} track={track} order={i + 1} />
      ))}
    </div>
  );
};

export default Songs;
