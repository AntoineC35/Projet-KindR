<?php
class AuthController extends AbstractController
{
    private CSRFTokenManager $tokenManager;
    private UserManager $um;
    private AddressManager $am;
	private PlaceManager $pm;
    private ActiviteManager $acm;
    private SituationManager $sm;
    private DisponibilityManager $dm;
	private AvatarManager $avm;

    public function __construct()
    {
        $this->tokenManager = new CSRFTokenManager();
        $this->um = new Usermanager();
        $this->am = new AddressManager();
		$this->pm = new PlaceManager();
        $this->acm = new ActiviteManager();
        $this->sm = new SituationManager();
        $this->dm = new DisponibilityManager();
		$this->avm = new AvatarManager();
    }

    //I hade trouble with keeping SESSION with CORS Policy 
    // public function appendToSessionCSRF(string $content)
    // {
    //     $sessionFile = "config/fakeSession.json";
    //     $existingContent = file_get_contents($sessionFile);
    //     $data = json_decode($existingContent, true);
    //     $data["csrf_token"] = json_decode($content, true);
    //     $updatedContent = json_encode($data);
    //     file_put_contents($sessionFile, $updatedContent);
    // }

    public function getCSRFToken() :void {
        $this->render(["data" => $_SESSION]);
    }

    public function createUser(array $post) :void {
       
        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
    
            
            $passwordRegex = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/';
            if (!preg_match($passwordRegex, $post["password"])) {
                $this->render(["success"=> false, "message" => "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character and be at least 8 characters long"]);
                return;
            }
    
            if ($post["password"] !== $post["verify_password"]) {
                $this->render(["success"=> false, "message" => "Password does not match"]);
            } else {
                $user = $this->um->findByEmail($post["email"]);
                if ($user === null) {
                    $hash = password_hash($post["password"], PASSWORD_DEFAULT);
                    
                    $newUser = new User(
                        htmlspecialchars($post["firstname"]),
                        htmlspecialchars($post["lastname"]),
                        htmlspecialchars($post["email"]),
                        $hash,
                        htmlspecialchars($post["role"])
                    );
                    
                    $newNewUser = $this->um->createUser($newUser);
                    $_SESSION["user"] = $newNewUser;
    
                    // $this->saveUserToSession(json_encode($newNewUser->toArray()));
    
                    $this->render(["success"=> true, "data" => $newNewUser->toArray(), "connected"=> true]);
                } else {
                    $this->render(["success"=> false, "message" => "Email already exists"]);
                }
            }
        } else {
            $this->render(["success"=> false, "message" => "Token validation failed"]);
        }
    }
    

    public function signIn(array $post) :void {
        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
            if (isset($post["password"]) && isset($post["email"])) {
                $email = $post["email"];
                $password = $post["password"];
                $user = $this->um->findByEmail($email);
    
                if ($user) {
                    if (password_verify($password, $user->getPassword())) {
                        $address = $this->am->findByUserId($user->getId());
                        if ($address !== null) {
                            $user->setAddress($address);
                        }
                        $place = $this->pm->findByUserId($user->getId());
                        if ($place !== null) {
                            $user->setPlace($place);
                        }
                        $activite = $this->acm->findByUserId($user->getId());
                        if ($activite !== null) {
                            $user->setActivite($activite);
                        }
                        $situation = $this->sm->findByUserId($user->getId());
                        if ($situation !== null) {
                            $user->setSituation($situation);
                        }
                        $disponibility = $this->dm->findAllByUser($user->getId());
                        if ($disponibility !== null) {
                            $user->setDisponibility($disponibility);
                        }
                        $avatar = $this->avm->findByUserId($user->getId());
                        if ($avatar !== null) {
                            $user->setAvatar($avatar);
                        }
                        $this->render(["connected"=> true, "data" => $user->fullUserToArray()]);
                    } else {
                        $this->render(["connected"=> false, "message" => "Wrong password"]);
                    }
                } else {
                    $this->render(["connected"=> false, "message" => "Email does not exist"]);
                }
            } else {
                $this->render(["connected"=> false, "message" => "Email and password are required"]);
            }
        } else {
            $this->render(["connected"=> false, "message" => "Token validation failed", "token" => $_SESSION["csrf_token"]]);
        }
    }
    
    public function logout() :void {
        session_destroy();
        //$this->deleteSession();
        $this->render(["connected"=> false, "message" => "User Logged Out", "data" => []]);
    }
    
}