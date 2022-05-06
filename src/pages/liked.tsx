import type { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";
import Liked from "../components/Liked/Liked";
import Player from "../components/Player/Player";
import Sidebar from "../components/Sidebar/Sidebar";

interface Props {
  session: Session;
}

const Home: NextPage<Props> = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex ">
        <Sidebar />
        <Liked />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
