import { atom } from "recoil";

export const likedSongState = atom({
  key: "likedSongsAtomState",
  default: [] as SpotifyApi.TrackObjectFull[],
});
