import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Center = () => {
  const { data: session } = useSession();
  const userIMG =
    session?.user?.image ||
    "https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166e65";

  return (
    <div className="flex flex-grow text-white">
      <h1>Center</h1>
      <header>
        <div>
          <Image
            className="rounded-full w-10 h-10"
            src={userIMG}
            alt="user"
            height={40}
            width={40}
          />
        </div>
      </header>
    </div>
  );
};

export default Center;
