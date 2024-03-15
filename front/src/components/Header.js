import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/authUser.action";
import { selectCurrentUser } from "../reducers/authUser.reducer";
import "../styles/header.css";
import Logo from "./Logo";

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
      <NavLink className="red nav" to="/messages">
        <em>_</em>
      </NavLink>
      <NavLink className="green nav" to="/profil">
        <em>^</em>
      </NavLink>
      <NavLink className="blue nav" to="/activites">
        <em>#</em>
      </NavLink>
      <NavLink className="yellow nav" to="/about">
        <em>/</em>
      </NavLink>
      {currentUser && currentUser.role === "admin" ? (
        <NavLink to="/posts_manager">Post Managers</NavLink>
      ) : null}
      {!connected ? (
        <NavLink to="/reg/sign_in">Sign In</NavLink>
      ) : (
        <p className="logout" onClick={handleLogout}>
          {" "}
          <em>&gt;</em>{" "}
        </p>
      )}
    </nav>
  );
};
export default Header;
