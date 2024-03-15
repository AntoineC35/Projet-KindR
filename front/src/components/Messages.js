import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllConversations } from "../actions/message.action";
import { selectConversations } from "../reducers/message.reducer";
import SelectedConv from "./SelectedConv";
import he from "he";
import "../styles/messagerie.css";

const Messages = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const conversationsUnsorted = useSelector(selectConversations);
  let conversations = [];
  if (conversationsUnsorted) {
    conversations = [...conversationsUnsorted];
    conversations.sort((a, b) => {
      const lastMessageA = a.messages[a.messages.length - 1];
      const lastMessageB = b.messages[b.messages.length - 1];
      const dateA = new Date(lastMessageA.date);
      const dateB = new Date(lastMessageB.date);
      return dateB - dateA;
    });
  }

  const [selectedConversation, setSelectedConversation] = useState();

  useEffect(() => {
    if (currentUser && currentUser["id"]) {
      let searchParam = new FormData();
      searchParam.append("user_id", currentUser["id"]);
      dispatch(getAllConversations(searchParam));
    }
  }, [dispatch, currentUser]);
  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  function handeClick(userId) {
    setSelectedConversation(userId);
  }

  return (
    <section className="messagerie">
      <h1>Boite de réception</h1>
      {conversations ? (
        conversations.map((conversation) =>
          conversation.user1["id"] === currentUser["id"] ? (
            <article
              key={conversation.id}
              className="conversation"
              onClick={() => handeClick(conversation.user2["id"])}
            >
              <figure className="figure">
                <img
                  src={conversation.user2["avatar"]["avatar_url"]}
                  alt="avatar"
                />
              </figure>
              <h3 className="name-block">
                {conversation.user2["lastname"]}{" "}
                {conversation.user2["firstname"]}
              </h3>
              <p className="content">
                {he.decode(
                  conversation.messages[
                    conversation.messages.length - 1
                  ].content.substring(0, 30)
                )}
              </p>
            </article>
          ) : (
            <article
              key={conversation.id}
              className="conversation"
              onClick={() => handeClick(conversation.user1["id"])}
            >
              <figure className="figure">
                <img
                  src={conversation.user1["avatar"]["avatar_url"]}
                  alt="avatar"
                />
              </figure>
              <h3 className="name-block">
                {conversation.user1["lastname"]}{" "}
                {conversation.user1["firstname"]}
              </h3>
              <p className="content">
                {conversation.messages[
                  conversation.messages.length - 1
                ].content.substring(0, 20)}
              </p>
            </article>
          )
        )
      ) : (
        <p>Aucune conversation en cours !</p>
      )}
      {selectedConversation ? (
        <SelectedConv
          userId={selectedConversation}
          conversations={conversations}
        />
      ) : (
        <p>aucune conversation choisie</p>
      )}
    </section>
  );
};

export default Messages;
