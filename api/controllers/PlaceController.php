<?php 

class PlaceController extends AbstractController 
{

    private CSRFTokenManager $tokenManager;
    private PlaceManager $pm;
    public function __construct()
    {
        $this->tokenManager = new CSRFTokenManager();
        $this->pm = new PlaceManager();
    }

    public function createPlace(array $post) :void {

        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
            $place = $this->pm->findByUserId($post["user_id"]);
            if ($place === null) {
                $place = new Place(
                    htmlspecialchars($post["user_id"]),
                    htmlspecialchars($post["type"]),
                    htmlspecialchars($post["level"]),
                    htmlspecialchars($post["pool"]),
                    htmlspecialchars($post["garden"]),
                    htmlspecialchars($post["elevator"]),
                    htmlspecialchars($post["yard"]),
                    htmlspecialchars($post["pets"]),
                    htmlspecialchars($post["smoker"]),
                    htmlspecialchars($post["near_school"]),
                    htmlspecialchars($post["near_park"]),
                    htmlspecialchars($post["near_sea"]),
                    htmlspecialchars($post["near_walk"]),
                );
    
                $newPlace = $this->pm->createPlace($place);
    
                $this->render(["success"=> true, "data" => $newPlace->toArray()]);
            } else {
                $this->render(["success"=> false, "message" => "Place already exists"]);
            }
        } else {
            $this->render(["success"=> false, "message" => "Token validation failed"]);
        }
    }
    
}