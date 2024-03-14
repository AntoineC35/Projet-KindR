<?php

class Address {
    private int $id;
    public function __construct(private int $user_id, private string $address, private int $postal_code, private string $city, private array $location)
    {
        
    }

    public function toArray() 
    {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "address" => $this->address,
            "postal_code" => $this->postal_code,
            "city" => $this->city,
            "location" => $this->location
        ];
    }

    /**
     * Get the value of user_id
     *
     * @return  mixed
     */
    public function getUser_id()
    {
        return $this->user_id;
    }

    /**
     * Set the value of user_id
     *
     * @param   mixed  $user_id  
     *
     * @return  self
     */
    public function setUser_id($user_id)
    {
        $this->user_id = $user_id;

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
     * Get the value of postal_code
     *
     * @return  mixed
     */
    public function getPostal_code()
    {
        return $this->postal_code;
    }

    /**
     * Set the value of postal_code
     *
     * @param   mixed  $postal_code  
     *
     * @return  self
     */
    public function setPostal_code($postal_code)
    {
        $this->postal_code = $postal_code;

        return $this;
    }

    /**
     * Get the value of city
     *
     * @return  mixed
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set the value of city
     *
     * @param   mixed  $city  
     *
     * @return  self
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get the value of location
     *
     * @return  mixed
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * Set the value of location
     *
     * @param   mixed  $location  
     *
     * @return  self
     */
    public function setLocation($location)
    {
        $this->location = $location;

        return $this;
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
}