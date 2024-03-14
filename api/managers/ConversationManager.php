<?php 

class ConversationManager extends AbstractManager {

    public function findAllByUserId($user_id) {
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
    

    public function findConversation($user1_id, $user2_id) {
        $conversation = $this->findConversationByUsers($user1_id, $user2_id);
    
        if (!$conversation) {
            $conversation = $this->findConversationByUsers($user2_id, $user1_id);
        }
    
        return $conversation;
    }
    
    private function findConversationByUsers($user1_id, $user2_id) {
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

    public function createConversation($user1_id, $user2_id) {
        $query = $this->db->prepare('INSERT INTO conversation VALUE(null, :user1_id, :user2_id)');
        $parameters = [
            "user1_id" => $user1_id,
            "user2_id" => $user2_id
        ];
        $query->execute($parameters);
        return $this->findConversation($user1_id, $user2_id);
    }

    public function editConversation(Conversation $conversation) 
    {

    }

    public function deleteConversation(Conversation $conversation) 
    {

    }


}