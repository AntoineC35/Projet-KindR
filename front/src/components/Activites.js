import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { selectCategories } from "../reducers/post.reducer";
import { useEffect, useState } from "react";
import { getCategories, getPosts } from "../actions/post.action";
import PostCard from "./PostCard";
import "../styles/activites.css";
import Navigation from "./Navigation";

const Activites = () => {
  const loggedIn = useSelector(selectIsLoggedIn);

  const [selectedCategory, setSelectedCategory] = useState();

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  return (
    <>
      <Navigation />
      <section className="activites">
        <form>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Choisir une catégorie</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.type}
                </option>
              ))}
          </select>
        </form>
        <section className="posts">
          <PostCard selectedCategory={selectedCategory} />
        </section>
      </section>
    </>
  );
};

export default Activites;
