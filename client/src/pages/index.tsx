import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Navbar from "../components/Navbar/Navbar";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Hello Next.js 👋</h1>
    </div>
  );
};

export default Home;
