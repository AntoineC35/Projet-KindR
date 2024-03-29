<?php

class AvatarManager extends AbstractManager {

    public function findByUserId(int $user_id) :?Avatar {
        $query = $this->db->prepare("SELECT * FROM avatar WHERE user_id = :user_id");
        $parameters = [
            "user_id" => $user_id
        ];
        $query->execute($parameters);
        $avatar = $query->fetch(PDO::FETCH_ASSOC);
        if ($avatar != null) {
            $newAvatar = new Avatar($avatar["user_id"], $avatar["avatar_url"], $avatar["avatar_alt"]);
            $newAvatar->setId($avatar["id"]);
            return $newAvatar;
        } else {
            return null; 
        }
    }

    public function createAvatar(array $postData) :?User {
        $query = $this->db->prepare("INSERT INTO avatar VALUES(null, :user_id, :avatar_url, :avatar_alt)");
        $parameters = [
            "user_id" => htmlspecialchars($postData["user_id"]),
            "avatar_url" => htmlspecialchars($postData["avatar_url"]),
            "avatar_alt" => htmlspecialchars($postData["avatar_alt"])
        ];
        $query->execute($parameters);
        return $this->findByUserId($postData["user_id"]);
    }

    public function deleteAvatar(Avatar $avatar) :void {
        $query = $this->db->prepare("DELETE FROM avatar WHERE id = :avatar_id");
        $parameters = [
            "avatar_id" => $avatar->getId()
        ];
        $query->execute($parameters);
    }
}