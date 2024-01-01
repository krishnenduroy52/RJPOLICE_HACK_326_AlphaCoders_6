import { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { DetailsContext } from "../../context/DetailsContext";
const Navbar = () => {
  const { test, user } = useContext(DetailsContext);
  console.log(test);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setUser(null);
  };

  console.log(user);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div>
          <a href="/">SafeLens</a>
        </div>
      </div>
      <div className={styles.nav_wrapper}>
        <div className={styles.nav}>
          <li>
            <a href="/">Services</a>
          </li>
          <li>
            <a href="/about-us">About</a>
          </li>
          <li>
            <a href="/contact-us">Contact Us</a>
          </li>
        </div>
      </div>
      <div className={styles.login}>
        {!user ? (
          <div>
            <Link to="/auth/signin">Login / Sign Up</Link>
          </div>
        ) : (
          <div>
            <Link onClick={handleLogout}>Logout</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
