import { useDispatch, useSelector } from "react-redux";
import { createPost, getCategories, getPosts } from "../actions/post.action";
import { selectCategories } from "../reducers/post.reducer";
import { useEffect, useState } from "react";
import { selectCSRFToken } from "../reducers/authUser.reducer";
import { getCSRFToken } from "../actions/authUser.action";
import PostCard from "./PostCard";
import "../styles/postManager.css";

const PostsManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
    dispatch(getCSRFToken());
  }, [dispatch]);

  const csrf_token = useSelector(selectCSRFToken);
  const categories = useSelector(selectCategories);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    content: "",
    category: "",
    link: "",
    img_url: "",
    img_alt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("title", formData.title);
    newFormData.append("date", formData.date);
    newFormData.append("content", formData.content);
    newFormData.append("address", formData.address);
    newFormData.append("category", formData.category);
    newFormData.append("link", formData.link);
    newFormData.append("img_url", formData.img_url);
    newFormData.append("img_alt", formData.img_alt);
    dispatch(createPost(newFormData)).then((res) => {
      setFormData({
        title: "",
        date: "",
        content: "",
        address: "",
        category: "",
        link: "",
        img_url: "",
        img_alt: "",
      });
      return dispatch(getPosts());
    });
  };

  return (
    <>
      <section className="post-manager">
        <h2>Ajouter un nouvel article</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="255"
          />

          <label htmlFor="date">Date :</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="content">Contenu :</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            maxLength="1300"
          ></textarea>

          <label htmlFor="address">Adresse :</label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            maxLength="255"
          ></input>

          <label htmlFor="category">Catégorie :</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Sélectionnez une catégorie
            </option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.type}
                </option>
              ))}
          </select>

          <label htmlFor="link">Link site web :</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            maxLength="255"
          />

          <label htmlFor="img_url">URL de l'image :</label>
          <input
            type="text"
            id="img_url"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
            maxLength="255"
          />

          <label htmlFor="img_alt">Texte alternatif de l'image :</label>
          <input
            type="text"
            id="img_alt"
            name="img_alt"
            value={formData.img_alt}
            onChange={handleChange}
            maxLength="255"
          />

          <button type="submit">Ajouter l'article</button>
        </form>
      </section>
      <section className="PostCard-edit">
        <PostCard />
      </section>
    </>
  );
};

export default PostsManager;
