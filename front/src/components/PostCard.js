import { useSelector } from "react-redux";
import { selectPosts } from "../reducers/post.reducer";
import { Link } from "react-router-dom";
import he from "he";
import "../styles/postCard.css";

const PostCard = ({ selectedCategory }) => {
  const posts = useSelector(selectPosts);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => {
        return post.category.id === Number(selectedCategory);
      })
    : posts;

  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  }

  return (
    <>
      {filteredPosts &&
        filteredPosts.map((post) => (
          <article className="postCard" key={post.id}>
            <figure>
              <img src={post.img_url} alt={post.img_alt}></img>
            </figure>
            <section className="infos">
              <h4 className="title">{he.decode(post.title)}</h4>
              <p className="type">{post.category.type}</p>
              <p className="date">
                <em>*</em>
                {formatDate(post.date)}
              </p>
              <Link className="button" to={`/activite_details/${post.id}`}>
                Voir le détail
              </Link>
            </section>
          </article>
        ))}
    </>
  );
};

export default PostCard;
