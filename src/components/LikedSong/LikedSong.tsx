import Image from "next/image";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { millisToMinutesAndSeconds } from "../../../lib/time";
import { currentTrackIdState, isPlayingState } from "../../../atoms/songAtom";
import useSpotify from "../../../hooks/useSpotify";
import { toast, ToastOptions } from "react-toastify";

interface Props {
  order: number;
  track: SpotifyApi.TrackObjectFull;
}

const defaultSong =
  "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

const toastOptions: ToastOptions = {
  autoClose: 5000,
  closeButton: true,
  position: "bottom-right",
  theme: "colored",
  type: "error",
};

const Song: FC<Props> = ({ order, track }) => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [_isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track?.id as string);

    setIsPlaying(true);
    spotifyApi.play({ uris: [track?.uri as string] }).catch((error) => {
      toast("Error playing track: " + error.message, toastOptions);
    });
  };

  return (
    <div
      onClick={playSong}
      className={`grid grid-cols-2 text-gray-500 py-4 px-5  rounded-lg hover:cursor-pointer ${
        track?.id === currentTrackId
          ? "bg-green-800 text-gray-300"
          : "hover:bg-gray-900"
      }`}
    >
      <div className="flex items-center space-x-4">
        <p className="p-4">{order + 1}</p>
        <Image
          height={40}
          width={40}
          src={track?.album.images[0]?.url || defaultSong}
          alt={track?.name}
        />
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track?.name}</p>
          <p className="w-40">{track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40">{track?.album.name}</p>
        <p>{millisToMinutesAndSeconds(track?.duration_ms || 0)}</p>
      </div>
    </div>
  );
};

export default Song;
