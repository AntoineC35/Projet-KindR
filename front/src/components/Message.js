import { useDispatch, useSelector } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { useEffect, useState } from "react";
import { getConversation, startConversation } from "../actions/message.action";
import { useParams, Navigate } from "react-router-dom";
import { selectedConversation } from "../reducers/message.reducer";
import { getPros } from "../actions/users.action";
import { selectPros } from "../reducers/users.reducer";
import { getCSRFToken } from "../actions/authUser.action";

const Message = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const pros = useSelector(selectPros);
  const [messageContent, setMessageContent] = useState("");
  const { pro_id } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const selectedPro = pros && pros.find((pro) => pro.id === Number(pro_id));
  const selectedConv = useSelector(selectedConversation);
  const csrf_token = useSelector(selectCSRFToken);

  useEffect(() => {
    if (pro_id && currentUser && currentUser["id"]) {
      dispatch(getPros());
      dispatch(getCSRFToken()).then((res) => {
        let searchParam = new FormData();
        searchParam.append("user2_id", pro_id);
        searchParam.append("user1_id", currentUser["id"]);
        if (!selectedConv || !selectedConv.messages) {
          dispatch(getConversation(searchParam));
        }
      });
    }
  }, [dispatch, pro_id, currentUser, selectedConv]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = new FormData();
    newMessage.append("content", messageContent);
    newMessage.append("csrf_token", csrf_token);
    newMessage.append("user1_id", currentUser["id"]);
    newMessage.append("user2_id", pro_id);
    dispatch(startConversation(newMessage));
    setMessageContent("");
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  return (
    <>
      {selectedPro ? (
        <h2>Welcome to the conversation with {selectedPro.lastname}</h2>
      ) : (
        <p>No professional found with the specified ID.</p>
      )}
      {selectedConv && selectedConv.messages ? (
        selectedConv.messages.length > 0 ? (
          <div>
            {selectedConv.messages.map((message) => (
              <p key={message.id}>
                {message && message.user_id === currentUser["id"] ? (
                  <span className="userMessage">{message.content}</span>
                ) : (
                  <span>{message.content}</span>
                )}
              </p>
            ))}
          </div>
        ) : (
          <p>No messages in the conversation yet!</p>
        )
      ) : (
        <h4>La conversation n'a pas démarré avec</h4>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          votre message :
          <textarea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </label>
        <button type="submit">Envoyer Message</button>
      </form>
    </>
  );
};

export default Message;
