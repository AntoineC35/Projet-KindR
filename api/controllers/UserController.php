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

    public function __construct()
	{
		$this->um = new UserManager();
		$this->am = new AddressManager();
		$this->pm = new PlaceManager();
		$this->acm = new ActiviteManager();
		$this->sm = new SituationManager();
		$this->dm = new DisponibilityManager();
		$this->avm = new AvatarManager();
	}


	public function findAll()
	{
		
		$users = $this->um->findAll();
		$list = [];
		foreach ($users as $user) {
			$list[] = $user->toArray();
			$_SESSION["user"] = $user;
		}
		$this->render(["data" => $list]);
	}

	public function findAllPro()
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

	public function findProByDispo($postData)
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

		public function findById($user_id) 
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

	public function searchAround()
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

}