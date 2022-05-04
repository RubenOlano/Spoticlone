import type { NextPage } from "next";
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main>
        <Sidebar />
        {/* Main content */}
      </main>

      <div>{/* Player */}</div>
    </div>
  );
};

export default Home;
