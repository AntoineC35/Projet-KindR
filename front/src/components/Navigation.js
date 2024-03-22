import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../reducers/authUser.reducer";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className="return-button" onClick={goBack}>
      <em>=</em>
    </button>
  );
};

export default Navigation;
