<?php 

class SituationManager extends AbstractManager {
    public function findByUserId($user)
    {
        $query = $this->db->prepare('SELECT * FROM situation WHERE user_id = :user_id');
        $parameters = [
            "user_id" => $user
        ];
        $query->execute($parameters);
        $situation = $query->fetch(PDO::FETCH_ASSOC);
        if ($situation != null) {
            $newSituation = new Situation(
                $situation["user_id"],
                $situation["age"],
                $situation["formation"],
                $situation["situation"],
                $situation["experience"],
                $situation["kids"],
                $situation["date_agrement"],
                $situation["other_adults"],
                $situation["total_capacity"]
            );
            $newSituation->setId($situation["id"]);
            return $newSituation;
        }
    }

    public function createSituation(Situation $situation) : Situation {
        $query = $this->db->prepare('INSERT INTO situation VALUES(
            null,
            :user_id,
            :age,
            :formation,
            :situation,
            :experience,
            :kids,
            :date_agrement,
            :other_adults,
            :total_capacity
            )');
        $parameters = [
            "user_id" => $situation->getUser_id(),
            "age" => $situation->getAge(),
            "formation" => $situation->getFormation(),
            "situation" => $situation->getSituation(),
            "experience" => $situation->getExperience(),
            "kids" => $situation->getKids(),
            "date_agrement" => $situation->getDate_agrement(),
            "other_adults" => $situation->getOther_adults(),
            "total_capacity" => $situation->getTotal_capacity()
        ];
        $query->execute($parameters);
        $lastId = $this->db->lastInsertId();

        $query = $this->db->prepare('SELECT * FROM situation WHERE id = :id');
        $parameters = [
            "id" => $lastId
        ];
        $query->execute($parameters);
        $situation = $query->fetch(PDO::FETCH_ASSOC);
        $newSituation = new Situation(
            $situation["user_id"],
            $situation["age"],
            $situation["formation"],
            $situation["situation"],
            $situation["experience"],
            $situation["kids"],
            $situation["date_agrement"],
            $situation["other_adults"],
            $situation["total_capacity"]
        );
        $newSituation->setId($situation["id"]);
        return $newSituation;
    }

    public function deleteSituation(Situation $situation) {
        $query = $this->db->prepare("DELETE FROM situation WHERE id = :situation_id");
        $parameters = [
            "situation_id" => $situation->getId()
        ];
        $query->execute($parameters);
    }

    public function editSituation(Situation $situation) {

    }
}