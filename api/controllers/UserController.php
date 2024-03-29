<?php
class UserController extends AbstractController 
{
    private UserManager $um;
	private AddressManager $am;
	private PlaceManager $pm;
	private ActiviteManager $acm;
	private SituationManager $sm;
	private DisponibilityManager $dm;
	private AvatarManager $avm;
	private MessageManager $mm;
	private ConversationManager $cm;

    public function __construct()
	{
		$this->um = new UserManager();
		$this->am = new AddressManager();
		$this->pm = new PlaceManager();
		$this->acm = new ActiviteManager();
		$this->sm = new SituationManager();
		$this->dm = new DisponibilityManager();
		$this->avm = new AvatarManager();
		$this->mm = new MessageManager();
		$this->cm = new ConversationManager();
	}

	//Method to find ALL Users
	public function findAll() :void
	{
		$users = $this->um->findAll() ;
		$list = [];
		foreach ($users as $user) {
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
			$conversations = $this->cm->findAllByUserId($user->getId());
			$conversationsArray = [];
			if (!empty($conversations)) {
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
				$user->setConversations($conversationsArray);
			}	
			$list[] = $user->fullUserToArray();
		}
		$this->render(["users" => $list]);
	}

	//Method to find all User but Parents and Admin
	public function findAllPro() :void
	{
		$pros = $this->um->findAllPro();
		$list = [];
		foreach ($pros as $pro) {
			$address = $this->am->findByUserId($pro->getId());
				if ($address !== null) {
					$pro->setAddress($address);
				}
			$place = $this->pm->findByUserId($pro->getId());
				if ($place !== null) {
					$pro->setPlace($place);
				}
			$activite = $this->acm->findByUserId($pro->getId());
				if ($activite !== null) {
					$pro->setActivite($activite);
				}
			$situation = $this->sm->findByUserId($pro->getId());
				if ($situation !== null) {
					$pro->setSituation($situation);
				}
			$disponibility = $this->dm->findAllByUser($pro->getId());
				if ($disponibility !== null) {
					$pro->setDisponibility($disponibility);
				}
			$avatar = $this->avm->findByUserId($pro->getId());
				if ($avatar !== null) {
					$pro->setAvatar($avatar);
				}
				
			$list[] = $pro->fullUserToArray();
		}
		$this->render(["pros" => $list]);
	}

	//Method to find Only Pro with Disponibility at a specific Datetime
	public function findProByDispo(array $postData) :void
	{
		$pros = $this->um->findProByDispo($postData);
		$list = [];
		foreach ($pros as $pro) {
			$address = $this->am->findByUserId($pro->getId());
				if ($address !== null) {
					$pro->setAddress($address);
				}
			$place = $this->pm->findByUserId($pro->getId());
				if ($place !== null) {
					$pro->setPlace($place);
				}
			$activite = $this->acm->findByUserId($pro->getId());
				if ($activite !== null) {
					$pro->setActivite($activite);
				}
			$situation = $this->sm->findByUserId($pro->getId());
				if ($situation !== null) {
					$pro->setSituation($situation);
				}
			$disponibility = $this->dm->findAllByUser($pro->getId());
				if ($disponibility !== null) {
					$pro->setDisponibility($disponibility);
				}
			$avatar = $this->avm->findByUserId($pro->getId());
				if ($avatar !== null) {
					$pro->setAvatar($avatar);
				}
			$list[] = $pro->fullUserToArray();
		}
		$this->render(["pros" => $list]);
	}

	//Method to find User by Id
	public function findById(int $user_id) :void
	{
		$user = $this->um->findById($user_id);
		if ($user !== null) {
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
			$this->render(["data" => $user->fullUserToArray()]);
		} else {
			$this->render(["error" => "Utilisateur non trouvé"], 404);
		}
	}	

	//Method to search around User with a specific distance set other Pros
	public function searchAround() :void
	{
		$address = $this->am->findByUserId($_POST["user_id"]);
		$addressesFilter = $this->am->findByDistance($address, $_POST["distance"]);
		$prosArray = [];
		
		foreach ($addressesFilter as $addressFilter ) {
			$userToDefined = $this->um->findById($addressFilter->getUser_id());
			$user = $this->um->findIfProById($userToDefined);

			if ($user !== null) {
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
				if ($user->getRole() != "parent" && $user->getRole() !="admin") {
					$prosArray[] = $user->fullUserToArray();
				}
				
			}
		}
		$this->render(["pros" => $prosArray]);
	}

	//Method to Delete One User and associated table entries
	public function deleteUser() :void {
		$user = $this->um->findById($_POST["user_id"]);
		if ($user !== null) {
			$address = $this->am->findByUserId($user->getId());
			if ($address !== null) {
				$this->am->deleteAddress($address);
			}
			$place = $this->pm->findByUserId($user->getId());
			if ($place !== null) {
				$this->pm->deletePlace($place);
			}
			$activite = $this->acm->findByUserId($user->getId());
			if ($activite !== null) {
				$this->acm->deleteActivite($activite);
			}
			$situation = $this->sm->findByUserId($user->getId());
			if ($situation !== null) {
				$this->sm->deleteSituation($situation);
			}
			$disponibility = $this->dm->findAllByUser($user->getId());
			if ($disponibility !== null) {
				$this->dm->deleteDisponibility($disponibility);
			}
			$avatar = $this->avm->findByUserId($user->getId());
				if ($avatar !== null) {
					$this->avm->deleteAvatar($avatar);
			}
			$conversations = $this->cm->findAllByUserId($user->getId());
			if ($conversations !== null) {
				foreach($conversations as $conversation) {
					$messages = $this->mm->findAllbyConversation($conversation);
						foreach($messages as $message) {
							$this->mm->deleteMessage($message);
						}
					$this->cm->deleteConversation($conversation);
				}
			}
			$this->um->deleteUser($user);
			
			$this->render(["message" => "User Deleted"]);
		} else {
			$this->render(["error" => "Utilisateur non trouvé"], 404);
		}

	}

	public function editUserPassword() :void {
		$hash = password_hash($_POST["password"], PASSWORD_DEFAULT);
		$user = $this->um->findById($_POST["user_id"]);
		$user->setPassword($hash);
		$this->um->editUserPassword($user);
		$this->render(["message" => "Bien joué !"]);
	}

	public function editUser() :void {
		$user = $this->um->findById($_POST["user_id"]);
		if ($user !== null) {
			$user->setFirstname($_POST['firstname']);
			$user->setLastname($_POST['lastname']);
			$user->setemail($_POST['email']);
			$user->setRole($_POST["role"]);
			$this->um->editUser($user);
			$this->render(["message" => "User updated !"]);
		} else {
			$this->render(["error" => "User not found"], 404);
		}
	}

}