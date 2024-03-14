import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPosts } from "../reducers/post.reducer";
import { useEffect } from "react";
import { getCategories, getPosts } from "../actions/post.action";
import he from "he";

const ActiviteDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector(selectPosts);

  const { activite_id } = useParams();
  const selectedPost =
    posts && posts.find((post) => post.id === Number(activite_id));

  return (
    <>
      {selectedPost ? (
        <article>
          <h2>{he.decode(selectedPost.title)}</h2>
          <img src={selectedPost.img_url} alt={selectedPost.img_alt} />
          <p>{selectedPost.content}</p>
          <p>{selectedPost.date}</p>
          <p>{selectedPost.category.type}</p>
          <p>{selectedPost.address}</p>
          <a target="_blank" href={selectedPost.link}>
            En savoir plus
          </a>
        </article>
      ) : null}
    </>
  );
};

export default ActiviteDetails;
