import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/auth-context";
import styles from "./Navbar.module.css";
import {
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";

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
          <Link to="/">
            <FontAwesomeIcon icon={faBlog} />
          </Link>
        </li>

        {!auth.isLoggedIn && (
          <>
            <li id={styles.navbar_signin}>
              <Link to="/signin" className={styles.navbar_item}>
                <FontAwesomeIcon icon={faSignInAlt} />
              </Link>
            </li>
            <li id={styles.navbar_signup}>
              <Link to="/signup" className={styles.navbar_item}>
                <FontAwesomeIcon icon={faUserPlus} />
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
            <FontAwesomeIcon icon={faSignOutAlt} />
          </li>
        )}
        {auth.roleName === "Admin" && (
          <Fragment>
            <li id={styles.navbar_new_article}>
              <Link to="/article/new" className={styles.navbar_item}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 226 226"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <path d="M0,226v-226h226v226z" fill="none"></path>
                    <g fill="#ffffff">
                      <path d="M45.90625,7.0625c-9.75128,0 -17.65625,7.90497 -17.65625,17.65625v10.59375h-10.59375c-5.84352,0.01745 -10.5763,4.75023 -10.59375,10.59375v56.5c0.01745,5.84352 4.75023,10.5763 10.59375,10.59375h10.59375v88.28125c0,9.75128 7.90497,17.65625 17.65625,17.65625h127.125c9.75128,0 17.65625,-7.90497 17.65625,-17.65625v-88.03296l28.46381,-28.4638c0.67156,-0.66041 1.05145,-1.56174 1.05524,-2.5036c-0.00852,-0.94292 -0.38754,-1.84465 -1.05524,-2.5105l-19.95294,-19.95294c-1.38778,-1.37693 -3.62632,-1.37693 -5.0141,0l-3.49676,3.49677v-17.40796c0.00797,-0.87684 -0.32029,-1.72341 -0.9173,-2.36566l-31.78125,-35.3125c-0.66776,-0.74004 -1.61718,-1.1634 -2.61395,-1.16559zM45.90625,14.125h105.9375v24.71875c0.01745,5.84352 4.75023,10.5763 10.59375,10.59375h21.1875v20.93921l-81.81879,81.81878c-0.35422,0.35041 -0.63141,0.7709 -0.81384,1.23456l-12.46283,32.45715c-0.52578,1.30057 -0.22146,2.78957 0.77246,3.77954c0.66929,0.6583 1.57173,1.02523 2.5105,1.02075c0.43536,0.00292 0.86688,-0.08151 1.26904,-0.24829l32.45715,-12.46283c0.46366,-0.18243 0.88415,-0.45962 1.23456,-0.81384l56.85174,-56.85175v80.97046c-0.01745,5.84352 -4.75023,10.5763 -10.59375,10.59375h-127.125c-5.84352,-0.01745 -10.5763,-4.75023 -10.59375,-10.59375v-88.28125h19.73914l20.12536,20.16675c0.66929,0.6583 1.57173,1.02523 2.5105,1.02075c0.46428,0.01259 0.92501,-0.08428 1.34491,-0.28278c1.32565,-0.53243 2.19218,-1.81991 2.18634,-3.24847v-17.65625h35.3125c5.84352,-0.01745 10.5763,-4.75023 10.59375,-10.59375v-56.5c-0.01745,-5.84352 -4.75023,-10.5763 -10.59375,-10.59375h-81.21875v-10.59375c0.01745,-5.84352 4.75023,-10.5763 10.59375,-10.59375zM158.90625,19.80811l20.30469,22.56689h-16.77344c-1.95026,0 -3.53125,-1.58099 -3.53125,-3.53125zM17.65625,42.375h98.875c1.95026,0 3.53125,1.58099 3.53125,3.53125v56.5c0,1.95026 -1.58099,3.53125 -3.53125,3.53125h-38.84375c-1.95026,0 -3.53125,1.58099 -3.53125,3.53125v12.67664l-15.14575,-15.18714c-0.6747,-0.65002 -1.57363,-1.01552 -2.5105,-1.02075h-38.84375c-1.95026,0 -3.53125,-1.58099 -3.53125,-3.53125v-56.5c0,-1.95026 1.58099,-3.53125 3.53125,-3.53125zM28.25,56.5v7.0625h7.0625v-7.0625zM42.375,56.5v7.0625h63.5625v-7.0625zM196.68787,67.30756l14.97333,14.97333l-9.99371,9.99371l-14.97333,-14.97333zM28.25,70.625v7.0625h77.6875v-7.0625zM181.72144,82.28088l4.97272,5.0141l-72.42511,72.39062l-4.97961,-4.97961zM28.25,84.75v7.0625h77.6875v-7.0625zM191.67377,92.2746l5.0141,4.97272l-72.42511,72.43201l-4.97961,-4.97961zM105.65472,161.02362l12.29041,12.29041l-7.24182,2.78638l-7.83496,-7.83496zM100.10956,175.46588l3.39331,3.39331l-5.54517,2.15186z"></path>
                    </g>
                  </g>
                </svg>
                <span>New Article</span>
              </Link>
            </li>
            <li id={styles.navbar_new_theme}>
              <Link to="/theme/new" className={styles.navbar_item}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 226 226"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <path d="M0,226v-226h226v226z" fill="none"></path>
                    <g fill="#ffffff">
                      <path d="M54.24,9.04c-14.95668,0 -27.12,12.16332 -27.12,27.12v155.56922c0,13.91256 12.16332,25.23078 27.12,25.23078h144.64v-9.04h-144.64c-9.79936,0 -18.08,-7.41294 -18.08,-16.19078c0,-8.66032 7.94164,-15.44922 18.08,-15.44922h144.64v-34.79164c-2.91088,1.03056 -5.92572,1.81514 -9.04,2.33945v23.41219h-135.6c-7.006,0 -13.31592,2.28105 -18.08,6.09141v-137.17141c0,-9.97112 8.10888,-18.08 18.08,-18.08h135.6v18.89219c3.11428,0.52432 6.12912,1.30889 9.04,2.33945v-30.27164zM180.8,45.2c-24.86,0 -45.2,20.34 -45.2,45.2c0,24.86 20.34,45.2 45.2,45.2c24.86,0 45.2,-20.34 45.2,-45.2c0,-24.86 -20.34,-45.2 -45.2,-45.2zM180.8,54.24c19.888,0 36.16,16.272 36.16,36.16c0,19.888 -16.272,36.16 -36.16,36.16c-19.888,0 -36.16,-16.272 -36.16,-36.16c0,-19.888 16.272,-36.16 36.16,-36.16zM180.8,63.73023c-2.712,0 -4.52,1.808 -4.52,4.52v17.62977h-17.62977c-2.712,0 -4.52,1.808 -4.52,4.52c0,2.712 1.808,4.52 4.52,4.52h17.62977v17.62977c0,2.712 1.808,4.52 4.52,4.52c2.712,0 4.52,-1.808 4.52,-4.52v-17.62977h17.62977c2.712,0 4.52,-1.808 4.52,-4.52c0,-2.712 -1.808,-4.52 -4.52,-4.52h-17.62977v-17.62977c0,-2.712 -1.808,-4.52 -4.52,-4.52z"></path>
                    </g>
                  </g>
                </svg>
                <span>New Theme</span>
              </Link>
            </li>
            <li id={styles.navbar_all_theme}>
              <Link to="/theme" className={styles.navbar_item}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 172 172"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g fill="#ffffff">
                      <path d="M41.28,6.88c-11.35469,0 -20.64,9.28531 -20.64,20.64v118.39781c0,10.92469 9.74219,19.20219 20.64,19.20219h110.08v-6.88h-110.08c-7.43094,0 -13.76,-5.57656 -13.76,-12.32219c0,-6.74563 6.19469,-11.75781 13.76,-11.75781h110.08v-127.28zM41.28,13.76h103.2v113.52h-103.2c-5.13312,0 -9.9975,1.85438 -13.76,4.87781v-104.63781c0,-7.6325 6.1275,-13.76 13.76,-13.76zM51.6,30.96c-3.7625,0 -6.88,3.1175 -6.88,6.88v13.76c0,3.7625 3.1175,6.88 6.88,6.88h72.24c3.7625,0 6.88,-3.1175 6.88,-6.88v-13.76c0,-3.7625 -3.1175,-6.88 -6.88,-6.88zM51.6,37.84h72.24v13.76h-72.24z"></path>
                    </g>
                  </g>
                </svg>
                <span>All Theme</span>
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
