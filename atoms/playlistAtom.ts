import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistAtomState",
  default: {} as SpotifyApi.SinglePlaylistResponse,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1DX4JAvHpjipBk",
});

export const songSearchState = atom({
  key: "songSearchState",
  default: {} as SpotifyApi.SearchResponse,
});
