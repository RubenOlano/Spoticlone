import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
});

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.accessToken as string);
    }
  }, [session]);
  return spotifyApi;
};

export default useSpotify;
