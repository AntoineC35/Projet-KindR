import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import Users from "./Users";
import PostsManager from "./PostsManager";
import "../styles/administration.css";

const Administration = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const [showUsers, setShowUsers] = useState(false);
  const [showPostsManager, setShowPostsManager] = useState(false);

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  if (currentUser && currentUser.role !== "admin") {
    return <Navigate to="/home" />;
  }

  const handleShowUsers = () => {
    setShowUsers(true);
    setShowPostsManager(false);
  };

  const handleShowPostsManager = () => {
    setShowPostsManager(true);
    setShowUsers(false);
  };

  return (
    <>
      <section className="administration-button">
        <button onClick={handleShowUsers} disabled={showUsers}>
          Show Users
        </button>
        <button onClick={handleShowPostsManager} disabled={showPostsManager}>
          Show PostsManager
        </button>
      </section>
      {showUsers && <Users />}
      {showPostsManager && <PostsManager />}
    </>
  );
};

export default Administration;
