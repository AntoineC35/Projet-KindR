import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/authUser.action";
import "../styles/header.css";
import Logo from "./Logo";
import { selectCurrentUser } from "../reducers/authUser.reducer";

const Header = () => {
  const connected = useSelector((state) => state.authUserReducer.connected);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav className="header">
      <Logo />
      <ul>
        <li>
          {" "}
          <NavLink className="red nav" to="/messages">
            <em>_</em>
          </NavLink>
        </li>
        <li>
          {currentUser && currentUser.role === "admin" ? (
            <NavLink className="admin" to="/admin">
              Admin
            </NavLink>
          ) : (
            <NavLink className="green nav" to="/profil">
              <em>^</em>
            </NavLink>
          )}
        </li>
        <li>
          <NavLink className="blue nav" to="/activites">
            <em>#</em>
          </NavLink>
        </li>
        <li>
          <NavLink className="yellow nav" to="/about">
            <em>/</em>
          </NavLink>
        </li>
        <li>
          {!connected ? (
            <NavLink to="/reg/sign_in">Sign In</NavLink>
          ) : (
            <button className="logout" onClick={handleLogout}>
              <em>&gt;</em>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
export default Header;
