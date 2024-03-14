<?php 

class User {
    private int $id;
    private ?Activite $activite = null;
    private ?Situation $situation = null;
    private ?Place $place = null;
    private array $disponibility = [];
    private ?Conversation $conversation = null;
    private ?Message $message = null;
    private ?Address $address = null;
    private ?int $availableSlot = null;
    private ?Avatar $avatar = null;
    public function __construct(private string $firstname, private string $lastname, private string $email, private string $password, private string $role)
    {
        
    }

    public function toArray()
    {
        return [
            "id" => $this->id,
            "firstname" => $this->firstname,
            "lastname" => $this->lastname,
            "email" => $this->email,
            // "password" => $this->password,
            "role" => $this->role,
        ];
    } 

    public function fullUserToArray()
    {
        $userArray = [
            "id" => $this->id,
            "firstname" => $this->firstname,
            "lastname" => $this->lastname,
            "email" => $this->email,
            "role" => $this->role,
        ];
        if ($this->activite !== null) {
            $userArray["activite"] = $this->activite->toArray();
        } 
        if ($this->situation !== null) {
            $userArray["situation"] = $this->situation->toArray();
        }
        if ($this->place !== null) {
            $userArray["place"] = $this->place->toArray();
        }
        if ($this->disponibility !== null) {
            $userArray["disponibility"] = $this->disponibility;
        }
        if ($this->message !== null) {
            $userArray["conversation"] = $this->message->toArray();
        }
        if ($this->address !== null) {
            $userArray["address"] = $this->address->toArray();
        }
        if ($this->availableSlot !== null) {
            $userArray["availableSlot"] = $this->availableSlot;
        }
        if ($this->avatar !== null) {
            $userArray["avatar"] = $this->avatar->toArray();
        }
    
        return $userArray;
    }

    /**
     * Get the value of id
     *
     * @return  mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @param   mixed  $id  
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of firstname
     *
     * @return  mixed
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set the value of firstname
     *
     * @param   mixed  $firstname  
     *
     * @return  self
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get the value of lastname
     *
     * @return  mixed
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set the value of lastname
     *
     * @param   mixed  $lastname  
     *
     * @return  self
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get the value of email
     *
     * @return  mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @param   mixed  $email  
     *
     * @return  self
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of password
     *
     * @return  mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @param   mixed  $password  
     *
     * @return  self
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get the value of role
     *
     * @return  mixed
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * Set the value of role
     *
     * @param   mixed  $role  
     *
     * @return  self
     */
    public function setRole($role)
    {
        $this->role = $role;

        return $this;
    }



    /**
     * Get the value of activite
     *
     * @return  mixed
     */
    public function getActivite()
    {
        return $this->activite;
    }

    /**
     * Set the value of activite
     *
     * @param   mixed  $activite  
     *
     * @return  self
     */
    public function setActivite($activite)
    {
        $this->activite = $activite;

        return $this;
    }

    /**
     * Get the value of situation
     *
     * @return  mixed
     */
    public function getSituation()
    {
        return $this->situation;
    }

    /**
     * Set the value of situation
     *
     * @param   mixed  $situation  
     *
     * @return  self
     */
    public function setSituation($situation)
    {
        $this->situation = $situation;

        return $this;
    }

    /**
     * Get the value of place
     *
     * @return  mixed
     */
    public function getPlace()
    {
        return $this->place;
    }

    /**
     * Set the value of place
     *
     * @param   mixed  $place  
     *
     * @return  self
     */
    public function setPlace($place)
    {
        $this->place = $place;

        return $this;
    }

    /**
     * Get the value of disponibility
     *
     * @return  mixed
     */
    public function getDisponibility()
    {
        return $this->disponibility;
    }

    /**
     * Set the value of disponibility
     *
     * @param   mixed  $disponibility  
     *
     * @return  self
     */
    public function setDisponibility($disponibility)
    {
        $this->disponibility = $disponibility;

        return $this;
    }

    /**
     * Get the value of conversation
     *
     * @return  mixed
     */
    public function getConversation()
    {
        return $this->conversation;
    }

    /**
     * Set the value of conversation
     *
     * @param   mixed  $conversation  
     *
     * @return  self
     */
    public function setConversation($conversation)
    {
        $this->conversation = $conversation;

        return $this;
    }

    /**
     * Get the value of message
     *
     * @return  mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set the value of message
     *
     * @param   mixed  $message  
     *
     * @return  self
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get the value of address
     *
     * @return  mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set the value of address
     *
     * @param   mixed  $address  
     *
     * @return  self
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get the value of availableSlot
     *
     * @return  mixed
     */
    public function getAvailableSlot()
    {
        return $this->availableSlot;
    }

    /**
     * Set the value of availableSlot
     *
     * @param   mixed  $availableSlot  
     *
     * @return  self
     */
    public function setAvailableSlot($availableSlot)
    {
        $this->availableSlot = $availableSlot;

        return $this;
    }

    /**
     * Get the value of avatar
     *
     * @return  mixed
     */
    public function getAvatar()
    {
        return $this->avatar;
    }

    /**
     * Set the value of avatar
     *
     * @param   mixed  $avatar  
     *
     * @return  self
     */
    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }
}