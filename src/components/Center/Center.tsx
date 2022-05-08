import { ChevronDownIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../../../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast, ToastOptions } from "react-toastify";
import useSpotify from "../../../hooks/useSpotify";
import Songs from "../Songs/Songs";
import { currentTrackIdState } from "../../../atoms/songAtom";
const colors = [
  "from-indigo-500",
  "from-pink-500",
  "from-purple-500",
  "from-yellow-500",
  "from-green-500",
  "from-blue-500",
  "from-red-500",
];

const defaultImage =
  "https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166e65";

const defaultPlaylist =
  "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

const toastOptions: ToastOptions = {
  theme: "colored",
  type: "error",
  autoClose: 5000,
  closeButton: true,
  position: "bottom-right",
  pauseOnHover: false,
};

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = React.useState<String>("");
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [_trackId, setTrackId] = useRecoilState(currentTrackIdState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop()!);
  }, [playlistId]);

  const handlePlay = async () => {
    try {
      await spotifyApi.play({
        uris: [
          ...playlist.tracks.items
            .map((track) => track?.track?.uri as string)
            .filter((uri) => uri.search("spotify:track") !== -1),
        ],
        position_ms: 0,
      });
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setTrackId(data.body?.item?.id as string);
      });
    } catch (error: any) {
      toast("Error playing tracks: " + error.message, toastOptions);
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => {
          toast("Error getting playlist: " + err.message, toastOptions);
        });
    }
  }, [playlistId, setPlaylist, spotifyApi]);

  const userIMG = session?.user?.image || defaultImage;

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex items-center bg-black space-x-3 opacity-90 hover:opactiy-80 cursor-pointer rounded-full p-1 pr-2 z-10"
        >
          <Image
            className="rounded-full w-10 h-10"
            src={userIMG}
            alt="user"
            height={40}
            width={40}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <Image
          className="shadow-2xl"
          height={176}
          width={176}
          src={playlist?.images?.[0].url || defaultPlaylist}
          alt="playlist"
        />
        <div>
          <p>Playlist</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
        <div className="flex justify-end items-center space-x-3">
          <p>{playlist?.tracks?.total} songs</p>
        </div>
        <div className="flex flex-grow justify-end hover:cursor-pointer pr-5 ">
          <PlayIcon
            className="button h-24 w-24 text-green-600 z-0"
            onClick={handlePlay}
          />
        </div>
      </section>
      <Songs />
    </div>
  );
};

export default Center;
