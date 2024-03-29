<?php 

class AddressController extends AbstractController 
{

    private CSRFTokenManager $tokenManager;
    private AddressManager $am;
    public function __construct()
    {
        $this->tokenManager = new CSRFTokenManager();
        $this->am = new AddressManager();
    }

    public function createAddress(array $post) :void {
        $location = [];
		$lat = json_decode($post["location"])->lat;
		$long = json_decode($post["location"])->long;
		$location["lat"]= $lat;
		$location["long"]= $long;

        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
            $address = $this->am->findByUserId($post["user_id"]);
            if ($address === null) {
                $address = new Address(
                    htmlspecialchars($post["user_id"]),
                    htmlspecialchars($post["address"]),
                    htmlspecialchars($post["postal_code"]),
                    htmlspecialchars($post["city"]),
                    $location
                );
    
                $newAddress = $this->am->createAddress($address);
    
                $this->render(["success"=> true, "data" => $newAddress->toArray()]);
            } else {
                $this->render(["success"=> false, "message" => "Address already exists"]);
            }
        } else {
            $this->render(["success"=> false, "message" => "Token validation failed"]);
        }
    }
    
}