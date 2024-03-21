import { NavLink } from "react-router-dom";
import "../styles/logo.css";

const Logo = () => {
  return (
    <NavLink className="first" to="/home">
      <img
        className="logo"
        src={process.env.PUBLIC_URL + "/img/kindrlogo.png"}
        alt="KindR Logo"
      />{" "}
    </NavLink>
  );
};

export default Logo;
