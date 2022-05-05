import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { shuffle } from "lodash";

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

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = React.useState("");

  useEffect(() => {
    setColor(shuffle(colors).pop()!);
  }, []);

  const userIMG = session?.user?.image || defaultImage;

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opactiy-80 cursor-pointer rounded-full p-1 pr-2">
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
        yo
        {/* <Image /> */}
      </section>
    </div>
  );
};

export default Center;
