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
    <header>
      <nav className="header">
        <Logo />
        <ul>
          <li>
            <NavLink className="red nav" to="/messages" title="Messages">
              <em>_</em>
            </NavLink>
          </li>
          <li>
            {currentUser && currentUser.role === "admin" ? (
              <NavLink className="admin" to="/admin" title="Admin">
                Admin
              </NavLink>
            ) : (
              <NavLink className="green nav" to="/profil" title="Profil">
                <em>^</em>
              </NavLink>
            )}
          </li>
          <li>
            <NavLink className="blue nav" to="/activites" title="Activités">
              <em>#</em>
            </NavLink>
          </li>
          <li>
            <NavLink className="yellow nav" to="/about" title="À propos">
              <em>/</em>
            </NavLink>
          </li>
          <li>
            {!connected ? (
              <NavLink to="/reg/sign_in" title="Se connecter">
                Sign In
              </NavLink>
            ) : (
              <button
                className="logout"
                onClick={handleLogout}
                title="Déconnexion"
              >
                <em>&gt;</em>
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
