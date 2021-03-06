import React, { useEffect } from "react";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import useSpotify from "../../../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../../atoms/playlistAtom";
import { likedSongState } from "../../../atoms/likedAtom";
import Link from "next/link";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlist, setPlaylists] = React.useState<
    SpotifyApi.PlaylistBaseObject[]
  >([]);
  const [_playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [_likedSong, setLikedSongs] = useRecoilState(likedSongState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const fetchTopTracks = async () => {
    if (spotifyApi.getAccessToken()) {
      const data = await spotifyApi.getMyTopTracks({
        limit: 50,
        time_range: "short_term",
      });
      setLikedSongs(data.body.items);
      console.log(data.body.items);
    }
  };

  return (
    <div className="hidden md:inline-flex text-gray-500 p-5 text-xs lg:text-sm border-r-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w[15-rem] pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <Link passHref href="/">
            <p>Home</p>
          </Link>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <Link passHref href="/search">
            <p>Search</p>
          </Link>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5 " />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <Link href="/liked" passHref>
            <p onClick={fetchTopTracks}>Top Songs</p>
          </Link>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 " />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlist.map((playlist) => (
          <Link key={playlist.id} passHref href="/">
            <p
              onClick={() => setPlaylistId(playlist.id)}
              className="cursor-pointer hover:text-white"
            >
              {playlist.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
