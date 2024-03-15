import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { selectCategories } from "../reducers/post.reducer";
import { useEffect } from "react";
import { getCategories, getPosts } from "../actions/post.action";
import PostCard from "./PostCard";

const Activites = () => {
  const loggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  console.log(categories);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
  }, [dispatch]);

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }
  return <PostCard />;
};

export default Activites;
