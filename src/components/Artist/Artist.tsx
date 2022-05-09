import Image from "next/image";
import React, { FC } from "react";

interface Props {
  artist: SpotifyApi.ArtistObjectFull;
}

const defaultImage =
  "https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166e65";
const Artist: FC<Props> = ({ artist }) => {
  return (
    <div className="grid grid-cold-2 text-gray-500 py-4 px-5 rounded-lg hover:cursor-pointer">
      <div className="flex flex-col items-center space-x-4">
        <Image
          height={200}
          width={200}
          src={artist.images[0]?.url || defaultImage}
          alt={artist.name}
        />
        <p>{artist.name}</p>
      </div>
    </div>
  );
};

export default Artist;
