<?php 

class ActiviteController extends AbstractController 
{

    private CSRFTokenManager $tokenManager;
    private ActiviteManager $am;
    public function __construct()
    {
        $this->tokenManager = new CSRFTokenManager();
        $this->am = new ActiviteManager();
    }

    public function createActivite(array $post) {
        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
            $activite = $this->am->findByUserId($post["user_id"]);
            if ($activite === null) {
                $activite = new Activite(
                    htmlspecialchars($post["user_id"]),
                    htmlspecialchars($post["game_space"]),
                    htmlspecialchars($post["library"]),
                    htmlspecialchars($post["show"]),
                    htmlspecialchars($post["pool"]),
                    htmlspecialchars($post["playground"]),
                    htmlspecialchars($post["walk"]),
                    htmlspecialchars($post["cinema"]),
                    htmlspecialchars($post["collective_playspace"]),
                );
    
                $newActivite = $this->am->createActivite($activite);
    
                $this->render(["success"=> true, "data" => $newActivite->toArray()]);
            } else {
                $this->render(["success"=> false, "message" => "Activite already exists"]);
            }
        } else {
            $this->render(["success"=> false, "message" => "Token validation failed"]);
        }
    }
    
}