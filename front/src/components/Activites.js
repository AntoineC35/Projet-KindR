import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";
import { Navigate, useNavigate } from "react-router-dom";
import { selectCategories } from "../reducers/post.reducer";
import { useEffect, useState } from "react";
import { getCategories, getPosts } from "../actions/post.action";
import PostCard from "./PostCard";
import "../styles/activites.css";

const Activites = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
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

  const goBack = () => {
    navigate(-1);
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  return (
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
      <button className="back" onClick={goBack}>
        <em>=</em>
      </button>
      <section className="posts">
        <PostCard selectedCategory={selectedCategory} />
      </section>
    </section>
  );
};

export default Activites;
