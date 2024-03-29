<?php 

class ConversationManager extends AbstractManager {

    public function findAllByUserId(int $user_id) :array {
        $query = $this->db->prepare('SELECT * FROM conversation WHERE user1_id = :user_id OR user2_id = :user_id');
        $parameters = [
            "user_id" => $user_id
        ];
        $query->execute($parameters);
        $conversations = $query->fetchAll(PDO::FETCH_ASSOC);
        $conversationsArray = [];
        if ($conversations != null) {
            foreach($conversations as $conversation) {
                $newConversation = new Conversation($conversation["user1_id"], $conversation["user2_id"]);
                $newConversation->setId($conversation["id"]);
                $conversationsArray[] = $newConversation;
            }
            return $conversationsArray;
        }
    }
    
    //Method find a specific conversation between Users (inverse order if initiation of conversation is by either user)
    public function findConversation(int $user1_id,int $user2_id) :?Conversation{
        $conversation = $this->findConversationByUsers($user1_id, $user2_id);
    
        if (!$conversation) {
            $conversation = $this->findConversationByUsers($user2_id, $user1_id);
        } else {
            return null; 
        }
    
        return $conversation;
    }
    
    private function findConversationByUsers(int $user1_id, int $user2_id) :?Conversation {
        $query = $this->db->prepare('SELECT * FROM conversation WHERE user1_id = :user1_id AND user2_id = :user2_id');
        $parameters = [
            "user1_id" => $user1_id,
            "user2_id" => $user2_id
        ];
        $query->execute($parameters);
        $conversation = $query->fetch(PDO::FETCH_ASSOC);
    
        if ($conversation) {
            $newConversation = new Conversation($conversation["user1_id"], $conversation["user2_id"]);
            $newConversation->setId($conversation["id"]);
            return $newConversation;
        }
    
        return null;
    }

    public function createConversation(int $user1_id, int $user2_id) :?Conversation {
        $query = $this->db->prepare('INSERT INTO conversation VALUE(null, :user1_id, :user2_id)');
        $parameters = [
            "user1_id" => $user1_id,
            "user2_id" => $user2_id
        ];
        $query->execute($parameters);
        return $this->findConversation($user1_id, $user2_id);
    }

    public function deleteConversation(Conversation $conversation) :void 
    {
        $query = $this->db->prepare("DELETE FROM conversation WHERE id = :conversation_id");
        $parameters = [
            "conversation_id" => $conversation->getId()
        ];
        $query->execute($parameters);
    }


}