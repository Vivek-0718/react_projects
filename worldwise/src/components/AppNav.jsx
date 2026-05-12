import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="city" className={styles.active}>
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink to="contry">Contries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
