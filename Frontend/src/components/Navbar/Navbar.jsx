import { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { DetailsContext } from "../../context/DetailsContext";
const Navbar = () => {
  const { user, isAdmin } = useContext(DetailsContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div>
          <Link to="/">
            SAFE<span style={{ color: "#00c8ff" }}>LENS</span>
          </Link>
        </div>
      </div>
      <div className={styles.nav_wrapper}>
        <div className={styles.nav}>
          {isAdmin ? (
            <li>
              <Link to="/admin/dashboard">Admin</Link>
            </li>
          ) : (
            <li>
              <Link to="/user/dashboard">Dashboard</Link>
            </li>
          )}
          <li>
            <Link to="/about-us">About</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
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
