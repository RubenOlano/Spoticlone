import React from "react";
import { useRecoilValue } from "recoil";
import { searchArtistState } from "../../../atoms/searchAtom";
import Artist from "../Artist/Artist";

const Artists = () => {
  const artists = useRecoilValue(searchArtistState);
  console.log(artists);

  return (
    <div className="text-white px-8 flex-col space-y-1 pt-28 pb-28 grid grid-cols-4">
      {artists.artists?.items.map((artist) => (
        <Artist key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default Artists;
