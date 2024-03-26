import { useDispatch, useSelector } from "react-redux";
import { selectPros } from "../reducers/users.reducer";
import { Navigate, useParams } from "react-router-dom";
import Calendar from "./Calendar";
import { getPros } from "../actions/users.action";
import { useEffect } from "react";
import { selectCurrentUser } from "../reducers/authUser.reducer";

const Disponibility = () => {
  const dispatch = useDispatch();
  const pros = useSelector(selectPros);
  const currentUser = useSelector(selectCurrentUser);
  const { pro_id } = useParams();
  useEffect(() => {
    if (pro_id) {
      dispatch(getPros());
    }
  }, [dispatch, pro_id]);
  const selectedPro = pros && pros.find((pro) => pro.id === Number(pro_id));

  return (
    <>
      {selectedPro.id === currentUser.id ? (
        <Navigate to="/disponibility_register" />
      ) : null}
      <Calendar pro={selectedPro} />
    </>
  );
};

export default Disponibility;
