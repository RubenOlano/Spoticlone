import React from "react";
import { useRecoilValue } from "recoil";
import { songSearchState } from "../../../atoms/playlistAtom";
import Song from "../LikedSong/LikedSong";

const SearchSongs = () => {
  const searchRes = useRecoilValue(songSearchState);
  return (
    <div className="text-white px-8 flex-col space-y-1 pb-28 pt-20">
      {searchRes.tracks?.items.map((track, i) => (
        <Song key={track?.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default SearchSongs;
