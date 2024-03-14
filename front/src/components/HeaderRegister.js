import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const HeaderRegister = () => {
  return (
    <NavLink to="/home">
      <Logo />
    </NavLink>
  );
};

export default HeaderRegister;
