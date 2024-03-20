import { useDispatch, useSelector } from "react-redux";
import { selectConversations } from "../reducers/message.reducer";
import { useState, useEffect, useRef } from "react";
import "../styles/selectedConv.css";
import {
  selectCSRFToken,
  selectCurrentUser,
} from "../reducers/authUser.reducer";
import { Link } from "react-router-dom";
import he from "he";
import {
  getAllConversations,
  startConversation,
} from "../actions/message.action";
import { getCSRFToken } from "../actions/authUser.action";

const SelectedConv = ({ userId, setSelectedConversation }) => {
  const conversationRef = useRef(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  //On Récupère toutes les conversations du Current User
  const conversations = useSelector(selectConversations);
  // On choisis la conversation ou on retrouve l'utilisateur sur lequel on a cliqué
  const [selectedConv, setSelectedConv] = useState();
  const [selectedPro, setSelectedPro] = useState();
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const [messageContent, setMessageContent] = useState("");
  const csrf_token = useSelector(selectCSRFToken);

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

  useEffect(() => {
    if (conversations) {
      const selectedConv = conversations.find((conversation) => {
        return (
          conversation.user1_id === userId || conversation.user2_id === userId
        );
      });

      if (selectedConv) {
        setSelectedConv(selectedConv);
        if (selectedConv.user1_id === userId) {
          setSelectedPro(selectedConv.user1);
        } else {
          setSelectedPro(selectedConv.user2);
        }
      }
    }
  }, [conversations, userId, dispatch]);

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = new FormData();
    newMessage.append("content", messageContent);
    newMessage.append("csrf_token", csrf_token);
    newMessage.append("user1_id", currentUser["id"]);
    newMessage.append("user2_id", userId);
    dispatch(startConversation(newMessage)).then((e) => {
      if (currentUser && currentUser["id"]) {
        let searchParam = new FormData();
        searchParam.append("user_id", currentUser["id"]);
        dispatch(getAllConversations(searchParam));
      }
      setMessageContent("");
      scrollToBottom();
    });
  };

  function handleResetSelectedConv() {
    setSelectedConversation(null);
  }

  return (
    <section className="messages mobile">
      {selectedPro ? (
        <section className="message-header">
          <button onClick={handleResetSelectedConv}>
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

export default SelectedConv;
