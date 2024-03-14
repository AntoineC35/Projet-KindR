import { useSelector } from "react-redux";
import { selectConversations } from "../reducers/message.reducer";
import { useState, useEffect } from "react";

const SelectedConv = ({ userId }) => {
  const conversations = useSelector(selectConversations);
  const [selectedConversation, setSelectedConversation] = useState();

  useEffect(() => {
    conversations.forEach((conversation) => {
      if (
        conversation.user1_id === userId ||
        conversation.user2_id === userId
      ) {
        setSelectedConversation(conversation);
      }
    });
  }, [conversations, userId]);

  return (
    <div>
      <h1>Selected Conversation</h1>
      {selectedConversation && (
        <>
          {selectedConversation.messages.map((message) => (
            <p key={message.id}>{message.content}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default SelectedConv;
