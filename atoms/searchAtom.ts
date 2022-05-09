import { atom } from "recoil";

export const searchArtistState = atom({
  key: "searchArtistState",
  default: {} as SpotifyApi.SearchResponse,
});
