<?php 

class DisponibilityManager extends AbstractManager {

    public function findAllByUser($user_id) {
        $query = $this->db->prepare('SELECT * FROM disponibility WHERE user_id = :user_id');
        $parameters = [
            "user_id" => $user_id
        ];
        $query->execute($parameters);
        $disponibilities= $query->fetchAll(PDO::FETCH_ASSOC);
        $disponibilitiesArray = [];
        foreach($disponibilities as $disponibility) {
            $newDisponibility = new Disponibility($disponibility["user_id"], $disponibility["start_datetime"], $disponibility["end_datetime"]);
            $newDisponibility->setId($disponibility["id"]);
            $disponibilitiesArray[]=$newDisponibility->toArray();
        }
        return $disponibilitiesArray;
    }

    public function createDisponibility(Disponibility $disponibility) : Disponibility {
        $query = $this->db->prepare('INSERT INTO disponibility VALUES(null, :user_id, :start_datetime, :end_datetime)');
        $parameters = [
            "user_id" => $disponibility->getUser_id(),
            "start_datetime" => $disponibility->getStart_datetime(),
            "end_datetime" => $disponibility->getEnd_datetime()
        ];
        $query->execute($parameters);
        $lastId = $this->db->lastInsertId();

        $query = $this->db->prepare('SELECT * FROM disponibility WHERE id = :id');
        $parameters = [
            "id" => $lastId
        ];
        $query->execute($parameters);
        $disponibility = $query->fetch(PDO::FETCH_ASSOC);
        $newDisponibility = new Disponibility($disponibility["user_id"], $disponibility["start_datetime"], $disponibility["end_datetime"]);
        $newDisponibility->setId($disponibility["id"]);
        return $newDisponibility;
    }

    public function deleteDisponibility(array $disponibilities) {
        foreach($disponibilities as $disponibility) {
            $query = $this->db->prepare("DELETE FROM disponibility WHERE id = :disponibility_id");
            $parameters = [
                "disponibility_id" => $disponibility["id"]
            ];
            $query->execute($parameters);
        }
        
    }

    public function editDisponibility(Disponibility $disponibility) {
        
    }
 
}

