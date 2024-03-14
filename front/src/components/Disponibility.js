import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../reducers/authUser.reducer";
import { selectPros } from "../reducers/users.reducer";
import { useParams } from "react-router-dom";
import Calendar from "./Calendar";
import { getPros } from "../actions/users.action";
import { useEffect } from "react";

const Disponibility = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const pros = useSelector(selectPros);
  const { pro_id } = useParams();
  useEffect(() => {
    if (pro_id) {
      dispatch(getPros());
    }
  }, [dispatch, pro_id]);
  const selectedPro = pros && pros.find((pro) => pro.id === Number(pro_id));

  return (
    <>
      <Calendar pro={selectedPro} />
    </>
  );
};

export default Disponibility;
