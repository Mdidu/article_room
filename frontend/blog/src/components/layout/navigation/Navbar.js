import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/auth-context";

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
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/articles">Voir les articles</Link>
        </li>

        {auth.roleName === "Admin" && (
          <>
            <li>
              <Link to="/article/new">New Article</Link>
            </li>
            <li>
              <Link to="/theme/new">New Theme</Link>
            </li>
            <li>
              <Link to="/theme">All Theme</Link>
            </li>
          </>
        )}

        {!auth.isLoggedIn && (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}

        {auth.isLoggedIn && <li onClick={logoutHandler}>Logout</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
