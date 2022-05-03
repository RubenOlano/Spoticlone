import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../images/logo.png";
import search from "../../images/search.png";

const Navbar = () => {
  // Create Navbar object that contains logo centered and a search bar
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>
          <Image
            width={100}
            height={100}
            src={logo}
            alt="logo"
            className={styles.logoImg}
          />
        </a>
      </Link>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <Image
            width={20}
            height={20}
            src={search}
            alt="search"
            className={styles.searchImg}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
