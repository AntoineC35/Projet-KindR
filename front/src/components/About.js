import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";

const About = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  if (!loggedIn) {
    return <Navigate to="/register" />;
  }
  return <h1>About</h1>;
};

export default About;
