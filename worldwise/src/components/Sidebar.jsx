import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>

      <Outlet></Outlet>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright 2026 by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
