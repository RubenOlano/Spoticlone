import { ChevronDownIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { shuffle } from "lodash";
import { playlistIdState } from "../../../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../../../hooks/useSpotify";
import Songs from "../LikedSongs/LikedSongs";
import { currentTrackIdState, isPlayingState } from "../../../atoms/songAtom";
import { likedSongState } from "../../../atoms/likedAtom";
import usePlayer from "../../../hooks/usePlayer";

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
  "https://i.pinimg.com/originals/fe/5c/36/fe5c36b8b4cbaa728f3c03a311e002cb.png";

const Liked = () => {
  const { data: session } = useSession();
  const [color, setColor] = React.useState("");
  const playlistId = useRecoilValue(playlistIdState);
  const [_trackId, setTrackId] = useRecoilState(currentTrackIdState);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongState);
  const [_playState, setPlayState] = useRecoilState(isPlayingState);
  const spotifyApi = useSpotify();
  const { deviceId } = usePlayer();

  useEffect(() => {
    setColor(shuffle(colors).pop()!);
  }, [playlistId]);

  const handlePlay = async () => {
    new Spotify.Player({
      name: "Spotify Player",
      getOAuthToken: (cb) => cb(session?.accessToken as string),
    });
    await spotifyApi.play({
      uris: [
        ...likedSongs
          .map((track) => track?.uri as string)
          .filter((uri) => uri.search("spotify:track") !== -1),
      ],
      position_ms: 0,
      device_id: deviceId,
    });
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      setTrackId(data.body?.item?.id as string);
    });
    setPlayState(true);
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopTracks({ limit: 50 }).then((data) => {
        setLikedSongs(data.body.items);
      });
    }
  }, [setLikedSongs, spotifyApi]);

  const userIMG = session?.user?.image || defaultImage;

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex items-center bg-black space-x-3 opacity-90 hover:opactiy-80 cursor-pointer rounded-full p-1 pr-2"
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
          src={defaultPlaylist}
          alt="playlist"
        />
        <div>
          <p>Playlist</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            Top Songs
          </h1>
        </div>
        <div className="flex flex-grow justify-end hover:cursor-pointer pr-5 ">
          <PlayIcon
            className="button h-24 w-24 text-green-600"
            onClick={handlePlay}
          />
        </div>
      </section>
      <Songs />
    </div>
  );
};

export default Liked;
