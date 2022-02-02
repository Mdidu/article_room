import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/auth-context";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.logoutHandler();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li id={styles.navbar_logo}>
          <Link to="/">LOGO</Link>
        </li>

        {!auth.isLoggedIn && (
          <>
            <li id={styles.navbar_signin}>
              <Link to="/signin" className={styles.navbar_item}>
                Sign In
              </Link>
            </li>
            <li id={styles.navbar_signup}>
              <Link to="/signup" className={styles.navbar_item}>
                Sign Up
              </Link>
            </li>
          </>
        )}

        {auth.isLoggedIn && (
          <li
            onClick={logoutHandler}
            id={styles.navbar_logout}
            className={styles.navbar_item}
          >
            Logout
          </li>
        )}
        {auth.roleName === "Admin" && (
          <Fragment>
            <li id={styles.navbar_new_article}>
              <Link to="/article/new" className={styles.navbar_item}>
                New Article
              </Link>
            </li>
            <li id={styles.navbar_new_theme}>
              <Link to="/theme/new" className={styles.navbar_item}>
                New Theme
              </Link>
            </li>
            <li id={styles.navbar_all_theme}>
              <Link to="/theme" className={styles.navbar_item}>
                All Theme
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
