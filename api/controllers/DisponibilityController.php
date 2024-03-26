<?php 

class DisponibilityController extends AbstractController 
{

    private CSRFTokenManager $tokenManager;
    private DisponibilityManager $dm;
    private SituationManager $sm;
    public function __construct()
    {
        $this->tokenManager = new CSRFTokenManager();
        $this->dm = new DisponibilityManager();
        $this->sm = new SituationManager();
    }

    public function createDisponibilitySlot(array $post) {

        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
            $slotAvailable = $this->sm->findByUserId($post["user_id"]);
            $slotTaken = $this->dm->findAllByUser($post["user_id"]);
            if (count($slotTaken) < $slotAvailable->getTotal_capacity()) {
                $disponibilitySlot = new Disponibility(
                    htmlspecialchars($post["user_id"]),
                    htmlspecialchars($post["start_datetime"]),
                    htmlspecialchars($post["end_datetime"])
                );
            $newDisponibilitySlot = $this->dm->createDisponibility($disponibilitySlot);
            $allDisponibility = $this->dm->findAllByUser($post["user_id"]);
    
                $this->render(["success"=> true, "data" => $allDisponibility]);
            } else {
                $this->render(["success"=> false, "message" => "No slot available"]);
            }
        } else {
            $this->render(["success"=> false, "message" => "Token validation failed"]);
        }
    }

    public function deleteDisponibilitySlot($post) {
        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
            $slotToDelete = $this->dm->findById($post["disponibility_id"]);
            if ($slotToDelete != null) {
            $this->dm->deleteOneDisponibility($slotToDelete);
        } else {
            $this->render(["error-message" => "Disponibilité inconnu"]);
        } 
        }else {
            $this->render(["error-message" => "Token validation failed"]);
    }
}
    
}