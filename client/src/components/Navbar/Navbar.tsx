import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../images/logo.png";
import search from "../../images/search.png";

const Navbar = () => {
  const [hidden, setHidden] = React.useState<boolean>(true);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!hidden) {
      ref.current?.focus();
    }
  }, [hidden]);

  const handleClick = () => {
    setHidden((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHidden((prev) => !prev);
    setSearchValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
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
        <h1 className={styles.title}>Spoticlone</h1>
      </div>
      {hidden ? (
        <div className={styles.search} onClick={handleClick}>
          <Image
            width={20}
            height={20}
            src={search}
            alt="search"
            className={styles.searchImg}
          />
        </div>
      ) : (
        <div className={styles.search}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              ref={ref}
              value={searchValue}
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              onChange={handleChange}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
