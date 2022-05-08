import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  VolumeUpIcon,
  ReplyIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import Image from "next/image";
import React from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../../atoms/songAtom";
import { volumeAtom } from "../../../atoms/volumeAtom";
import useSongInfo from "../../../hooks/useSongInfo";
import useSpotify from "../../../hooks/useSpotify";

const defaultSong =
  "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

const toastOptions: ToastOptions = {
  autoClose: 5000,
  closeButton: true,
  position: "bottom-right",
  theme: "colored",
  type: "error",
};

const Player = () => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useRecoilState(volumeAtom);
  const [shuffled, setShuffled] = React.useState(false);

  const songInfo = useSongInfo();

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi
          .pause()
          .catch((error) => {
            toast("Error pausing: " + error.message, toastOptions);
          })
          .then(() => setIsPlaying(false));
      } else {
        spotifyApi
          .play()
          .catch((error) => {
            toast("Error playing: " + error.message, toastOptions);
          })
          .then(() => setIsPlaying(true));
      }
    });
  };

  const handleShuffle = () => {
    spotifyApi
      .setShuffle(!shuffled)
      .then(() => {
        setShuffled((prev) => !prev);
      })
      .catch((error) => {
        toast("Error shuffling" + error.message, toastOptions);
      });
  };

  const handleSkip = () => {
    spotifyApi
      .skipToNext()
      .then(() => {
        spotifyApi
          .getMyCurrentPlayingTrack()
          .then((data) => {
            setCurrentTrackId(data.body?.item?.id as string);
          })
          .catch((error) => {
            toast("Error playing next track: " + error.message, toastOptions);
          });
      })
      .catch((error) => {
        toast("Error skipping: " + error.message, toastOptions);
      });
  };

  const handleRewind = () => {
    spotifyApi
      .skipToPrevious()
      .then(() => {
        spotifyApi
          .getMyCurrentPlayingTrack()
          .then((data) => {
            setCurrentTrackId(data.body?.item?.id as string);
          })
          .catch((error) => {
            toast("Error playing next track: " + error.message, toastOptions);
          });
      })
      .catch((error) => {
        toast("Error rewinding: " + error.message, toastOptions);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedAdjustVolume = React.useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
        toast("Error setting volume: " + err.message, toastOptions);
      });
    }, 250),
    []
  );

  React.useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      const fetchCurrentTrack = async () => {
        if (!songInfo) {
          spotifyApi
            .getMyCurrentPlayingTrack()
            .then((data) => {
              setCurrentTrackId(data.body?.item?.id as string);
            })
            .catch((error) => {
              toast("Setting Track: " + error.message, toastOptions);
            });
          spotifyApi
            .getMyCurrentPlaybackState()
            .then((data) => {
              setIsPlaying(data.body?.is_playing);
              setShuffled(data.body?.shuffle_state);
              isPlaying &&
                setVolume(data.body?.device?.volume_percent as number);
            })
            .catch((error) => {
              toast("Fetching playback state: " + error.message, toastOptions);
            });
        }
      };
      fetchCurrentTrack();
    }
  }, [
    currentTrackId,
    isPlaying,
    setCurrentTrackId,
    setIsPlaying,
    setVolume,
    songInfo,
    spotifyApi,
  ]);

  React.useEffect(() => {
    if (volume > 0 && volume < 100 && isPlaying) {
      debouncedAdjustVolume(volume);
    }
  }, [debouncedAdjustVolume, isPlaying, volume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4 ">
        <Image
          src={songInfo?.album?.images[0]?.url || defaultSong}
          className="hidden md:inline"
          height="40"
          width="40"
          alt={songInfo?.name}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly ">
        <SwitchHorizontalIcon
          className={`button text-${shuffled ? "green-500" : "gray-500"}`}
          onClick={() => handleShuffle()}
        />
        <RewindIcon className="button" onClick={() => handleRewind()} />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" onClick={handleSkip} />
        <ReplyIcon className="button" />
      </div>
      <div className="flex items-center justify-end space-x-3 md:space-x-4 pr-5">
        <VolumeDownIcon
          className="button"
          onClick={() => volume > 0 && setVolume((prev) => prev - 10)}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => volume <= 100 && setVolume((prev) => prev + 10)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Player;
