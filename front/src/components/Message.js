import { useDispatch, useSelector } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { useEffect, useRef, useState } from "react";
import { getConversation, startConversation } from "../actions/message.action";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { selectedConversation } from "../reducers/message.reducer";
import { getPros } from "../actions/users.action";
import { selectPros } from "../reducers/users.reducer";
import { getCSRFToken } from "../actions/authUser.action";
import "../styles/message.css";
import he from "he";

const Message = () => {
  const conversationRef = useRef(null);
  const loggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const pros = useSelector(selectPros);
  const [messageContent, setMessageContent] = useState("");
  const { pro_id } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const selectedPro = pros && pros.find((pro) => pro.id === Number(pro_id));
  const selectedConv = useSelector(selectedConversation);
  const csrf_token = useSelector(selectCSRFToken);
  const navigate = useNavigate();
  const [scrolledToBottom, setScrolledToBottom] = useState(true);

  useEffect(() => {
    if (scrolledToBottom && conversationRef.current) {
      scrollToBottom();
    }
  }, [selectedConv, scrolledToBottom]);

  const handleScroll = () => {
    if (conversationRef.current) {
      const container = conversationRef.current;
      const isScrolledToBottom =
        container.scrollHeight - container.clientHeight <=
        container.scrollTop + 1;
      setScrolledToBottom(isScrolledToBottom);
    }
  };

  const scrollToBottom = () => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (pro_id && currentUser && currentUser["id"]) {
      dispatch(getPros());
      dispatch(getCSRFToken()).then((res) => {
        let searchParam = new FormData();
        searchParam.append("user2_id", pro_id);
        searchParam.append("user1_id", currentUser["id"]);

        dispatch(getConversation(searchParam));
      });
    }
  }, [dispatch, pro_id, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = new FormData();
    newMessage.append("content", messageContent);
    newMessage.append("csrf_token", csrf_token);
    newMessage.append("user1_id", currentUser["id"]);
    newMessage.append("user2_id", pro_id);
    dispatch(startConversation(newMessage));
    setMessageContent("");
    scrollToBottom();
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  return (
    <section className="messages">
      {selectedPro ? (
        <section className="message-header">
          <button onClick={goBack}>
            <em>=</em>
          </button>
          <figure>
            <img
              src={selectedPro.avatar.avatar_url}
              alt={selectedPro.avatar.avatar_alt}
            />
          </figure>
          <h3>
            {selectedPro.firstname} {selectedPro.lastname}
          </h3>
          <Link className="detail-button" to={`/details/${selectedPro.id}`}>
            Voir Profil
          </Link>
        </section>
      ) : (
        <p>Pas d'utlilisateur trouvé avec cet ID.</p>
      )}
      <section className="message-block">
        {selectedConv && selectedConv.messages ? (
          selectedConv.messages.length > 0 ? (
            <div
              className="message-conversation"
              ref={conversationRef}
              onScroll={handleScroll}
            >
              {selectedConv.messages.map((message) =>
                message.user_id === currentUser["id"] ? (
                  <span key={message.id} className="userMessage">
                    <p>{he.decode(message.content)}</p>
                    <figure>
                      <img
                        src={currentUser.avatar.avatar_url}
                        alt={currentUser.avatar.avatar_alt}
                      ></img>
                    </figure>
                  </span>
                ) : (
                  <span key={message.id} className="otherMessage">
                    <figure>
                      <img
                        src={selectedPro.avatar.avatar_url}
                        alt={selectedPro.avatar.avatar_alt}
                      ></img>
                    </figure>
                    <p>{he.decode(message.content)}</p>
                  </span>
                )
              )}
            </div>
          ) : (
            <p>Pas de messages dans cette conversation !</p>
          )
        ) : (
          <p>
            Démarré la conversation ?<br></br> Envoyer votre premier message
          </p>
        )}

        <form className="message-submit" onSubmit={handleSubmit}>
          <figure>
            <img
              src={currentUser.avatar.avatar_url}
              alt={currentUser.avatar.avatar}
            ></img>
          </figure>
          <textarea
            placeholder="votre message ..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button type="submit">
            <em>#</em>
          </button>
        </form>
      </section>
    </section>
  );
};

export default Message;
