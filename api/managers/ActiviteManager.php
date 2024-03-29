<?php 
class ActiviteManager extends AbstractManager 
{
    public function findByUserId(int $user_id) :?Activite {
        $query = $this->db->prepare('SELECT * FROM activites WHERE user_id = :user_id');
        $parameters = [
            "user_id" => $user_id
        ];
        $query->execute($parameters);
        $activite = $query->fetch(PDO::FETCH_ASSOC);
        if ($activite != null) {
            $newActivite = new Activite($activite["user_id"], $activite["game_space"], $activite["library"], $activite["show"], $activite["pool"],  $activite["playground"], $activite["walk"], $activite["cinema"], $activite["collective_playspace"]);
            $newActivite->setId($activite["id"]);
            return $newActivite;
        } else {
            return null;
        }
    }

    public function createActivite(Activite $activite) : Activite {
        $query = $this->db->prepare('INSERT INTO activites VALUES(null, :user_id, :game_space, :library, :show, :pool, :playground, :walk, :cinema, :collective_playspace) ');
        $parameters = [
            "user_id" => $activite->getUser_id(),
            "game_space" => $activite->getGame_space(),
            "library" => $activite->getLibrary(),
            "show" => $activite->getShow(),
            "pool" => $activite->getPool(),
            "playground" => $activite->getPlayground(),
            "walk" => $activite->getWalk(),
            "cinema" => $activite->getCinema(),
            "collective_playspace" => $activite->getCollective_playspace()
        ];
        $query->execute($parameters);


        $query = $this->db->prepare('SELECT * FROM activites WHERE user_id = :user_id');
        $parameters = [
            "user_id" => $activite->getUser_id()
        ];
        $query->execute($parameters);
        $activite = $query->fetch(PDO::FETCH_ASSOC);
        $newActivite = new Activite($activite["user_id"], $activite["game_space"], $activite["library"], $activite["show"], $activite["pool"],  $activite["playground"], $activite["walk"], $activite["cinema"], $activite["collective_playspace"]);
        $newActivite->setId($activite["id"]);
        return $newActivite;
    }

    public function deleteActivite(Activite $activite) :void {
        $query = $this->db->prepare("DELETE FROM activites WHERE id = :activite_id");
        $parameters = [
            "activite_id" => $activite->getId()
        ];
        $query->execute($parameters);
    }
}