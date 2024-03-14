import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectCurrentUser,
} from "../reducers/authUser.reducer";
import Search from "./Search";

const Home = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  if (!user || !user.address) {
    return <Navigate to="/reg/address_register" />;
  }

  if (!user || !user.avatar) {
    return <Navigate to="/reg/avatar_register" />;
  }

  if (
    !user ||
    (!user.place && user.role !== "parent" && user.role !== "admin")
  ) {
    return <Navigate to="/reg/place_register" />;
  }

  if (
    !user ||
    (!user.activite && user.role !== "parent" && user.role !== "admin")
  ) {
    return <Navigate to="/reg/activite_register" />;
  }

  if (
    !user ||
    (!user.situation && user.role !== "parent" && user.role !== "admin")
  ) {
    return <Navigate to="/reg/situation_register" />;
  }

  return (
    <>
      <Search />
    </>
  );
};

export default Home;
