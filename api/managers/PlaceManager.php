<?php 

class PlaceManager extends AbstractManager {

    public function findByUserId($userId) {
        $query = $this->db->prepare('SELECT * FROM place WHERE user_id = :user_id');
        $parameters = [
            "user_id" => $userId
        ];
        $query->execute($parameters);
        $place = $query->fetch(PDO::FETCH_ASSOC);
        if ($place != null) {
            $newPlace = new Place(
                $place['user_id'],
                $place['type'],
                $place['level'],
                $place['pool'],
                $place['garden'],
                $place['elevator'],
                $place['yard'],
                $place['pets'],
                $place['smoker'],
                $place['near_school'],
                $place['near_park'],
                $place['near_sea'],
                $place['near_walk']);
            $newPlace->setId($place['id']);
            return $newPlace;
        }
        
    }

    public function createPlace(Place $place) : Place {
        $query = $this->db->prepare('INSERT INTO place 
        VALUES(
            null,
            :user_id,
            :type,
            :level,
            :pool,
            :garden,
            :elevator,
            :yard,
            :pets,
            :smoker,
            :near_school,
            :near_park,
            :near_sea,
            :near_walk
            )
        ');
        $parameters = [
            "user_id" => $place->getUser_id(),
            "type"  => $place->getType(),
            "level" => $place->getLevel(),
            "pool" => $place->getPool(),
            "garden" => $place->getGarden(),
            "elevator" => $place->getElevator(),
            "yard" => $place->getYard(),
            "pets" => $place->getPets(),
            "smoker" => $place->getSmoker(),
            "near_school" => $place->getNear_school(),
            "near_park" => $place->getNear_park(),
            "near_sea" => $place->getNear_sea(),
            "near_walk" => $place->getNear_walk(),
        ];
        $query->execute($parameters);
        
        $lastId = $this->db->lastInsertId();

        $query = $this->db->prepare('SELECT * FROM place WHERE id = :id');
        $parameters = [
            "id" => $lastId
        ];
        $query->execute($parameters);
        $place = $query->fetch(PDO::FETCH_ASSOC);
        $newPlace = new Place(
            $place['user_id'],
            $place['type'],
            $place['level'],
            $place['pool'],
            $place['garden'],
            $place['elevator'],
            $place['yard'],
            $place['pets'],
            $place['smoker'],
            $place['near_school'],
            $place['near_park'],
            $place['near_sea'],
            $place['near_walk']);
        $newPlace->setId($place['id']);
        return $newPlace;

    }

    public function deletePlace(Place $place) {

    }

    public function editPlace(Place $place) {
        
    }
}