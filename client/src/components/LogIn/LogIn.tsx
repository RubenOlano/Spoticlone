import React from "react";
import styles from "./Login.module.css";

const LogIn = () => {
  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.button}>
        Log In
      </button>
    </div>
  );
};

export default LogIn;
