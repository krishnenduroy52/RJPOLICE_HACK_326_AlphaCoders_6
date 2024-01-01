import styles from "./Navbar.module.css";
const Navbar = () => {
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
        <div>
          <a href="/login">Login / Sign Up</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
