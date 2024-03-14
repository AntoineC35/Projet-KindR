import { useSelector } from "react-redux";
import { selectPosts } from "../reducers/post.reducer";
import { Link } from "react-router-dom";
import he from "he";

const PostCard = () => {
  const posts = useSelector(selectPosts);

  return (
    <>
      <section>
        {posts &&
          posts.map((post) => (
            <article key={post.id}>
              <h2>{he.decode(post.title)}</h2>
              <p>{post.date}</p>
              <p>{post.category.type}</p>
              <p>{post.address}</p>
              <Link to={`/activite_details/${post.id}`}>Voir le détail</Link>
            </article>
          ))}
      </section>
    </>
  );
};

export default PostCard;
