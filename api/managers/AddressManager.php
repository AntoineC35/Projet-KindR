<?php 
class AddressManager extends AbstractManager {
    public function findByUserId($user_id) {
    $query = $this->db->prepare('SELECT id, user_id, address, postal_code, city, ST_X(location) as longitude, ST_Y(location) as latitude FROM address WHERE user_id = :user_id');
     $parameters = [
        "user_id" => $user_id
     ];
     $query->execute($parameters);
     $address = $query->fetch(PDO::FETCH_ASSOC);
        if ($address != null) { 
            $newAddress = new Address($address["user_id"], $address["address"], $address["postal_code"], $address["city"],["lat"=>$address["latitude"], "long"=>$address["longitude"]]);
            $newAddress->setId($address["id"]);
            return $newAddress;
        }
    }

    public function createAddress(Address $address) : Address {
        
        $query = $this->db->prepare('INSERT INTO address VALUES(null, :user_id, :address, :postal_code, :city, ST_GeomFromText(:location))');
        
        $parameters = [
            "user_id" => $address->getUser_id(),
            "address" => $address->getAddress(),
            "postal_code" => $address->getPostal_code(),
            "city" => $address->getCity(),
            "location" => 'POINT('.$address->getLocation()['lat'].' '.$address->getLocation()['long'].')'
        ];
            $query->execute($parameters);

        $query = $this->db->prepare('SELECT id, user_id, address, postal_code, city, ST_X(location) as longitude, ST_Y(location) as latitude FROM address WHERE user_id = :user_id');
        $parameters = [
            "user_id" => $address->getUser_id()
        ];
        $query->execute($parameters);
        $address = $query->fetch(PDO::FETCH_ASSOC);
        $newAddress = new Address($address["user_id"], $address["address"], $address["postal_code"], $address["city"],["lat"=>$address["latitude"], "long"=>$address["longitude"]]);
     $newAddress->setId($address["id"]);
        return $newAddress;
    }

    public function deleteAddress(Address $address) {
        $query = $this->db->prepare("DELETE FROM address WHERE id = :address_id");
        $parameters = [
            "address_id" => $address->getId()
        ];
        $query->execute($parameters);
    }
    
    public function editAddress(Address $address) {

    }

    public function findByDistance(Address $address, $distance) : array {
        $location = $address->getLocation();
        $distanceToSearch = $distance * 1000;
        try {
            $query= $this->db->prepare('SELECT
            id,
            user_id,
            address,
            postal_code,
            city,
            location,
            ST_X(location) as longitude, ST_Y(location) as latitude,
            ST_Distance_Sphere(
                ST_GeomFromText(:location_user1),
                location
            ) AS distance
            FROM
                address
            WHERE
            user_id <> :user_id
                AND ST_Distance_Sphere(
                    ST_GeomFromText(:location_user1),
                    location
                ) <= :distanceToSearch
            ORDER BY
                distance;');
        $parameters = [
            'location_user1' => 'POINT('.$location['long'].' '.$location['lat'].')',
            "user_id" => $address->getUser_id(),
            "distanceToSearch" => $distanceToSearch
        ];
        $query->execute($parameters);
        $addresses = $query->fetchAll(PDO::FETCH_ASSOC);
        $addressesArray = [];
        foreach($addresses as $address) {
            $newAddress = new Address($address["user_id"], $address["address"], $address["postal_code"], $address["city"], ["lat"=>$address["latitude"], "long"=>$address["longitude"]]);
            $newAddress->setId($address["id"]);
            $addressesArray[] = $newAddress;
        }
        return $addressesArray;
        }
        catch(Exception $e) {
            echo $e->getMessage();
            echo "</br>";
        }            
    }
}