import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
function Nav() {
  return (
    <nav className={styles.nav}>
      <Logo></Logo>
    </nav>
  );
}

export default Nav;
