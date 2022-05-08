import { ChevronDownIcon, SearchCircleIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { songSearchState } from "../../../atoms/playlistAtom";
import useSpotify from "../../../hooks/useSpotify";
import Songs from "../SearchSongs/SearchSongs";

const defaultImage =
  "https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166e65";

const Search = () => {
  const { data: session } = useSession();
  const [search, setSearch] = React.useState("");
  const setSearchResults = useSetRecoilState(songSearchState);
  const spotifyApi = useSpotify();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSearch("");
    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(res.body);
      console.log(res.body);
    });
    spotifyApi.searchAlbums(search).then((res) => {
      console.log(res.body);
    });
    spotifyApi.searchArtists(search).then((res) => {
      console.log(res.body);
    });
    e.preventDefault();
  };

  const userIMG = session?.user?.image || defaultImage;

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute flex flex-grow justify-evenly bg-black w-[85%] z-50">
        <div className="my-2 mx-3 w-full pr-2 pt-4 justify-start">
          <SearchCircleIcon className="absolute h-10 stroke-black" />
          <form className="mb-5" onSubmit={handleSubmit}>
            <input
              className="text-black bg-white box-border rounded-sm py-2 pl-10 pr-5 outline-none "
              type="search"
              value={search}
              onChange={handleChange}
              placeholder="Search"
            />
          </form>
        </div>
        <div
          onClick={() => signOut()}
          className="flex items-center space-x-3 opacity-90 hover:opactiy-80 cursor-pointer rounded-full p-1 pr-2 z-20 justify-end"
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
      <Songs />
    </div>
  );
};

export default Search;
