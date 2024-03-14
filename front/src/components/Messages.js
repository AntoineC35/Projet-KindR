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

const Messages = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const conversations = useSelector(selectConversations);
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
    <>
      <h1>Messagerie</h1>
      {conversations ? (
        conversations.map((conversation) => (
          <section key={conversation.id}>
            {conversation.user1["id"] === currentUser["id"] ? (
              <div onClick={() => handeClick(conversation.user2["id"])}>
                <p>{conversation.user2["lastname"]}</p>
                <p>{conversation.user2["firstname"]}</p>
                <p>
                  {conversation.messages[
                    conversation.messages.length - 1
                  ].content.substring(0, 20)}{" "}
                  ...
                </p>
              </div>
            ) : (
              <div onClick={() => handeClick(conversation.user1["id"])}>
                <p>{conversation.user1["lastname"]}</p>
                <p>{conversation.user1["firstname"]}</p>
                <p>
                  {conversation.messages[
                    conversation.messages.length - 1
                  ].content.substring(0, 20)}{" "}
                  ...
                </p>
              </div>
            )}
          </section>
        ))
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
    </>
  );
};

export default Messages;
