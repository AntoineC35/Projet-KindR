<?php

class UserManager extends AbstractManager
{

    // Method to retrieve all users
    public function findAll() : array {
    $query = $this->db->prepare('SELECT * FROM users');
        $query->execute();
        $users = $query->fetchAll(PDO::FETCH_ASSOC);
        $usersArray = [];
        foreach($users as $user) {
            $newUser = new User($user["firstname"], $user["lastname"], $user["email"], $user["password"], $user["role"]);
            $newUser->setId($user["id"]);
            $usersArray[] = $newUser;
        }
        // Return the array of users
        return $usersArray;
    }
    // Method to find a user by their ID
    public function findById(int $user_id) : ?User {
        $query = $this->db->prepare('SELECT * FROM users WHERE id = :id');
        $parameters = [
            "id" => $user_id
        ];
        $query->execute($parameters);
        $user = $query->fetch(PDO::FETCH_ASSOC);
        $newUser = new User($user["firstname"], $user["lastname"], $user["email"], $user["password"], $user["role"]);
        $newUser->setId($user["id"]);
        // Create a User object from the result and return it
            return $newUser;
    }
    // Method to find a user by their email address
    public function findByEmail(string $email) : ?User {
        $query = $this->db->prepare('SELECT * FROM users WHERE email = :email');
        $parameters = [
            "email" => $email
        ];
        $query->execute($parameters);
        $user = $query->fetch(PDO::FETCH_ASSOC);
        if ($user != null) {
        $newUser = new User($user["firstname"], $user["lastname"], $user["email"], $user["password"], $user["role"]);
        $newUser->setId($user["id"]);
         // If a user is found, create a User object and return it, otherwise return null
            return $newUser;
        } else {
            return null; 
        }
    }
     // Method to find a professional user by their ID
    public function findIfProById(User $user) : ?User {
                $query = $this->db->prepare(
                    "SELECT
                        users.id AS user_id,
                        users.firstname,
                        users.lastname,
                        users.email,
                        users.password,
                        users.role,
                        situation.total_capacity - COUNT(disponibility.id) AS available_slots
                    FROM
                        users
                        INNER JOIN situation ON users.id = situation.user_id
                        LEFT JOIN disponibility ON users.id = disponibility.user_id
                    WHERE
                        users.id = :id AND users.role NOT IN ('parent', 'admin')
                    GROUP BY
                        users.id, users.firstname, users.lastname, users.email, users.password, users.role, situation.total_capacity"
                );
                $parameters = [
                    ":id" => $user->getId()
                ];
                $query->execute($parameters);
                $user = $query->fetch(PDO::FETCH_ASSOC);
                if($user != null) {
                $newUser = new User($user["firstname"], $user["lastname"], $user["email"], $user["password"], $user["role"]);
                $newUser->setId($user["user_id"]);
                $newUser->setAvailableSlot($user["available_slots"]);
                return $newUser;
            } else {
                return null;
            }
    }
    // Method to retrieve all professional users
    public function findAllPro() : ?array {
        $query = $this->db->prepare(
            "SELECT
                users.id AS user_id,
                users.firstname,
                users.lastname,
                users.email,
                users.password,
                users.role,
                situation.total_capacity - COUNT(disponibility.id) AS available_slots
            FROM
                users
                INNER JOIN situation ON users.id = situation.user_id
                LEFT JOIN disponibility ON users.id = disponibility.user_id
            WHERE
                users.role NOT IN ('parent', 'admin')
            GROUP BY
                users.id, users.firstname, users.lastname, users.email, users.password, users.role, situation.total_capacity"
        );
    
        $query->execute();
        $users = $query->fetchAll(PDO::FETCH_ASSOC);
        $usersArray = [];
    
        foreach ($users as $user) {
            $newUser = new User($user["firstname"], $user["lastname"], $user["email"], $user["password"], $user["role"]);
            $newUser->setId($user["user_id"]);
            $newUser->setAvailableSlot($user["available_slots"]);
            $usersArray[] = $newUser;
        }
    
        return $usersArray;
    }

    // Method to create a new user
    public function createUser(User $user) : User {
        $query = $this->db->prepare('INSERT INTO users VALUES(null, :firstname, :lastname, :email, :password, :role)');
        $parameters = [
            "firstname" => $user->getFirstname(),
            "lastname" => $user->getLastname(),
            "email" => $user->getEmail(),
            "password" => $user->getPassword(),
            "role" => $user->getRole()
        ];
        $query->execute($parameters);
        
        $query = $this->db->prepare('SELECT * FROM users WHERE email = :email');
        $parameters = [
            "email" => $user->getEmail()
        ];
        $query->execute($parameters);
        $user = $query->fetch(PDO::FETCH_ASSOC);
        $newUser = new User($user["firstname"], $user["lastname"], $user["email"], $user["password"], $user["role"]);
        $newUser->setId($user["id"]);
        return $newUser;
    }
     // Method to find professional users by availability on a given date
    public function findProByDispo(array $postData) : ?array {
        $query = $this->db->prepare(
            "SELECT
                users.id AS user_id,
                users.firstname,
                users.lastname,
                users.email,
                users.password,
                users.role,
                situation.total_capacity - COUNT(disponibility.id) AS available_slots
            FROM
                users
                INNER JOIN situation ON users.id = situation.user_id
                LEFT JOIN disponibility ON users.id = disponibility.user_id AND disponibility.start_datetime <= :chosen_date AND disponibility.end_datetime >= :chosen_date
            WHERE
                users.role NOT IN ('parent', 'admin')
            GROUP BY
                users.id, users.firstname, users.lastname, users.email, users.password, users.role, situation.total_capacity
            HAVING
                available_slots > 0 OR COUNT(disponibility.id) = 0;"
        );
        
        $parameters = [
            "chosen_date" => $postData["chosen_date"]
        ];
        $query->execute($parameters);
        
        $users = $query->fetchAll(PDO::FETCH_ASSOC);
        $usersArray = [];
        
        foreach($users as $user) {
            $newUser = new User($user["firstname"], $user["lastname"], $user["email"], $user["password"], $user["role"]);
            $newUser->setAvailableSlot($user["available_slots"]);
            $newUser->setId($user["user_id"]);
            $usersArray[] = $newUser;
        }
        
        return $usersArray;
    }
        
    // Method to delete a user
    public function deleteUser(User $user) :void {
        $query = $this->db->prepare("DELETE FROM users WHERE id = :user_id");
        $parameters = [
            "user_id" => $user->getId()
        ];
        $query->execute($parameters);
    }
    // Method to edit a user's password
    public function editUserPassword(User $user) :void {
        $query = $this->db->prepare("UPDATE users SET password = :newPassword WHERE id = :userId");
        $parameters = [
            "newPassword" => $user->getPassword(),
            "userId" => $user->getId()
        ];
        $query->execute($parameters);
    }
    // Method to edit a user's details
    public function editUser(User $user) :void {
        $query = $this->db->prepare("UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, role = :role WHERE id = :userId");
        $parameters = [
            "firstname" => $user->getFirstname(),
            "lastname" => $user->getLastname(),
            "email" => $user->getEmail(),
            "role" => $user->getRole(),
            "userId" => $user->getId()
        ];
        var_dump($parameters);
        $query->execute($parameters);
    }

}