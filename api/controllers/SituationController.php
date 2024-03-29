<?php 

class SituationController extends AbstractController 
{

    private CSRFTokenManager $tokenManager;
    private SituationManager $sm;
    public function __construct()
    {
        $this->tokenManager = new CSRFTokenManager();
        $this->sm = new SituationManager();
    }

    public function createSituation(array $post) :void {

        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
            $situation = $this->sm->findByUserId($post["user_id"]);
            if ($situation === null) {
                $situation = new Situation(
                    htmlspecialchars($post["user_id"]),
                    htmlspecialchars($post["age"]),
                    htmlspecialchars($post["formation"]),
                    htmlspecialchars($post["situation"]),
                    htmlspecialchars($post["experience"]),
                    htmlspecialchars($post["kids"]),
                    htmlspecialchars($post["date_agrement"]),
                    htmlspecialchars($post["other_adults"]),
                    htmlspecialchars($post["total_capacity"])
                );
    
                $newSituation = $this->sm->createSituation($situation);
    
                $this->render(["success"=> true, "data" => $newSituation->toArray()]);
            } else {
                $this->render(["success"=> false, "message" => "Situation already exists"]);
            }
        } else {
            $this->render(["success"=> false, "message" => "Token validation failed"]);
        }
    }
    
}