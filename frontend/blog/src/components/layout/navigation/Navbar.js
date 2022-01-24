import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={{ pathname: "" }}>LOGO</Link>
        </li>
        <li>
          <Link to={{ pathname: "/articles" }}>Voir les articles</Link>
        </li>
        <li>
          <Link to={{ pathname: "/signin" }}>Sign In</Link>
        </li>
        <li>
          <Link to={{ pathname: "/signup" }}>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
