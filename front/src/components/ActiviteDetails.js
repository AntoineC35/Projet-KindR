import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectPosts } from "../reducers/post.reducer";
import { useEffect } from "react";
import { getCategories, getPosts } from "../actions/post.action";
import he from "he";
import "../styles/activiteDetails.css";

const ActiviteDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector(selectPosts);

  const goBack = () => {
    navigate(-1);
  };

  const { activite_id } = useParams();
  const selectedPost =
    posts && posts.find((post) => post.id === Number(activite_id));

  return (
    <>
      <button className="back" onClick={goBack}>
        <em>=</em>
      </button>
      {selectedPost ? (
        <article className="activiteDetails">
          <h2>{he.decode(selectedPost.title)}</h2>
          <figure>
            <img src={selectedPost.img_url} alt={selectedPost.img_alt} />
          </figure>

          <p>{selectedPost.category.type}</p>
          <p>
            <em>*</em>
            {formatDate(selectedPost.date)}
          </p>
          <span
            className="content"
            dangerouslySetInnerHTML={{
              __html: he.decode(selectedPost.content),
            }}
          />

          <p className="address">
            <em>7</em>
            {selectedPost.address}
          </p>
          <a
            className="link"
            target="_blank"
            rel="noreferrer"
            href={selectedPost.link}
          >
            Site Web
          </a>
        </article>
      ) : null}
    </>
  );
};

export default ActiviteDetails;
