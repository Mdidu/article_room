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
        <li className={styles.navbar_logo}>
          <Link to="/">LOGO</Link>
        </li>

        {!auth.isLoggedIn && (
          <>
            <li className={styles.navbar_signin}>
              <Link to="/signin">Sign In</Link>
            </li>
            <li className={styles.navbar_signup}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}

        {auth.isLoggedIn && (
          <li onClick={logoutHandler} className={styles.navbar_logout}>
            Logout
          </li>
        )}
        {auth.roleName === "Admin" && (
          <Fragment>
            <li className={styles.navbar_new_article}>
              <Link to="/article/new">New Article</Link>
            </li>
            <li className={styles.navbar_new_theme}>
              <Link to="/theme/new">New Theme</Link>
            </li>
            <li className={styles.navbar_all_theme}>
              <Link to="/theme">All Theme</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
