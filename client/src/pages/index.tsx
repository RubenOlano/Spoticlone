import type { NextPage } from "next";
import React from "react";
import styles from "../../styles/Home.module.css";
import LogIn from "../components/LogIn/LogIn";
import Navbar from "../components/Navbar/Navbar";

const Home: NextPage = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  return (
    <div className={styles.container}>{loggedIn ? <Navbar /> : <LogIn />}</div>
  );
};

export default Home;
