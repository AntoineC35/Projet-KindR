<?php 

class MessageManager extends AbstractManager {

    //Method to find all Messages by Conversation ID
    public function findAllbyConversation(Conversation $conversation) : array{
        $query = $this->db->prepare('SELECT * FROM messages WHERE conversation_id = :conversation_id' );
        $parameters = [
            "conversation_id" => $conversation->getId()
        ];
        $query->execute($parameters);
        $messages = $query->fetchAll(PDO::FETCH_ASSOC);
        $messagesArray = [];
        foreach($messages as $message) {
            $newMessage = new Message($message["conversation_id"], $message["user_id"], $message["content"], $message["date"]);
            $newMessage->setId($message["id"]);
            $messagesArray[] = $newMessage;
        }
        return $messagesArray;
    }
    

    public function createMessage(Message $message) : Message {
        $query = $this->db->prepare('INSERT INTO messages VALUES(null, :conversation_id, :user_id, :content, :date)');
        $parameters = [
            "conversation_id" => $message->getConversation_id(),
            "user_id" => $message->getUser_id(),
            "content" => $message->getContent(),
            "date" => $message->getDate()
        ];
        $query->execute($parameters);
        $lastId = $this->db->lastInsertId();
        
        $query = $this->db->prepare('SELECT * FROM messages WHERE id = :id');
        $parameters=[
            "id" => $lastId
        ];
        $query->execute($parameters);
        $message = $query->fetch(PDO::FETCH_ASSOC);
        $newMessage = new Message($message["conversation_id"], $message["user_id"], $message["content"], $message["date"]);
        $newMessage->setId($message["id"]);
        return $newMessage;
    }

    public function deleteMessage(Message $message) :void {
        $query = $this->db->prepare("DELETE FROM messages WHERE id = :message_id");
        $parameters = [
            "message_id" => $message->getId()
        ];
        $query->execute($parameters);

    }
}