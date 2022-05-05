import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistAtomState",
  default: {} as SpotifyApi.SinglePlaylistResponse,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "63rBrfWHpG3qjFybDd9cXx",
});
