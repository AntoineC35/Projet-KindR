<?php 

class ConversationController extends AbstractController 
{

    private CSRFTokenManager $tokenManager;
    private ConversationManager $cm;
    private MessageManager $mm;
    private UserManager $um;
    private AvatarManager $avm;

    public function __construct()
    {
        $this->tokenManager = new CSRFTokenManager();
        $this->cm = new ConversationManager();
        $this->mm = new MessageManager();
        $this->um = new UserManager();
        $this->avm = new AvatarManager();
    }

    public function getAllConversationByUser_id($postData) {
        $user_id = $postData["user_id"];
        $conversations = $this->cm->findAllByUserId($user_id);
    
        if (!empty($conversations)) {
            $conversationsArray = [];
    
            foreach($conversations as $conversation) {
                $user1 = $this->um->findById($conversation->getUser1_id());
                $avatar = $this->avm->findByUserId($user1->getId());
				if ($avatar !== null) {
					$user1->setAvatar($avatar);
				}
                $user2 = $this->um->findById($conversation->getUser2_id());
                $avatar2 = $this->avm->findByUserId($user2->getId());
				if ($avatar2 !== null) {
					$user2->setAvatar($avatar2);
				}
                $messages = $this->mm->findAllbyConversation($conversation);
                $messagesArray = [];
    
                foreach($messages as $message) {
                    $messagesArray[] = $message->toArray();
                }

                $conversation->setUser1($user1->fullUserToArray());
                $conversation->setUser2($user2->fullUserToArray());
                $conversation->setMessages($messagesArray);
                $conversationsArray[] = $conversation->toArray();
            }
    
            $this->render(["conversations" => $conversationsArray]);
        } else {
            $this->render(["errorMessage" => "No conversations found for the user."]);
        }
    }
     

    public function getConversationByUsers($postData) {
        $user1Id = htmlspecialchars($postData["user1_id"]);
        $user2Id = htmlspecialchars($postData["user2_id"]);
        $conversation = $this->cm->findConversation($user1Id, $user2Id);
        if ($conversation != null) {
            $messages = $this->mm->findAllbyConversation($conversation);
            $messagesArray = [];
            foreach($messages as $message) {
                $messagesArray[] = $message->toArray();
            }
            $conversation->setMessages($messagesArray);
            $this->render(["conversation" => $conversation->toArray()]);
        } else {
            $this->render(["exist" => false]);
        }
    }

    public function startConversation($postData) {
        $user1Id = htmlspecialchars($postData["user1_id"]);
        $user2Id = htmlspecialchars($postData["user2_id"]);
        $content = htmlspecialchars($postData["content"]);
    
        if ($this->tokenManager->validateCSRFToken($postData["csrf_token"])) {
            $existingConversation = $this->cm->findConversation($user1Id, $user2Id);
    
            if ($existingConversation) {
                $newMessage = new Message($existingConversation->getId(), $user1Id, $content, date('Y-m-d H:i:s'));
                $messageCreated = $this->mm->createMessage($newMessage);
    
                if ($messageCreated) {
                    $messages = $this->mm->findAllbyConversation($existingConversation);
                    $messagesArray = [];
                    foreach ($messages as $message) {
                        $messagesArray[] = $message->toArray();
                    }
                    $existingConversation->setMessages($messagesArray);
                    $this->render(["conversation" => $existingConversation->toArray()]);
                } else {
                    $this->render(["errorMessage" => "Issue with creating a message"]);
                }
            } else {
                $newConversation = $this->cm->createConversation($user1Id, $user2Id);
    
                if ($newConversation) {
                    $newMessage = new Message($newConversation->getId(), $user1Id, $content, date('Y-m-d H:i:s'));
                    $messageCreated = $this->mm->createMessage($newMessage);
    
                    if ($messageCreated) {
                        $messages = $this->mm->findAllbyConversation($newConversation);
                        $messagesArray = [];
                        foreach ($messages as $message) {
                            $messagesArray[] = $message->toArray();
                        }
                        $newConversation->setMessages($messagesArray);
                        $this->render(["conversation" => $newConversation->toArray()]);
                    } else {
                        $this->render(["errorMessage" => "Issue with creating a message"]);
                    }
                } else {
                    $this->render(["errorMessage" => "Issue with creating a conversation"]);
                }
            }
        } else {
            $this->render(["errorMessage" => "CSRF TOKEN FALSE"]);
        }
    }
    

}