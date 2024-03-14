<?php

class Place {
    private int $id;
    public function __construct(private int $user_id, private string $type, private string $level, private string $pool, private string $garden, private string $elevator, private string $yard, private string $pets, private string $smoker, private string $near_school, private string $near_park, private string $near_sea, private string $near_walk) 
    {
        
    }

    public function toArray() {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "type" => $this->type,
            "level" => $this->level,
            "pool" => $this->pool,
            "garden" => $this->garden,
            "elevator" => $this->elevator,
            "yard" => $this->yard,
            "pets" => $this->pets,
            "smoker" => $this->smoker,
            "near_school" => $this->near_school,
            "near_park" => $this->near_park,
            "near_sea" => $this->near_sea,
            "near_walk" => $this->near_walk,
        ];
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
     * Get the value of type
     *
     * @return  mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @param   mixed  $type  
     *
     * @return  self
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get the value of level
     *
     * @return  mixed
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Set the value of level
     *
     * @param   mixed  $level  
     *
     * @return  self
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
    }

    /**
     * Get the value of pool
     *
     * @return  mixed
     */
    public function getPool()
    {
        return $this->pool;
    }

    /**
     * Set the value of pool
     *
     * @param   mixed  $pool  
     *
     * @return  self
     */
    public function setPool($pool)
    {
        $this->pool = $pool;

        return $this;
    }

    /**
     * Get the value of garden
     *
     * @return  mixed
     */
    public function getGarden()
    {
        return $this->garden;
    }

    /**
     * Set the value of garden
     *
     * @param   mixed  $garden  
     *
     * @return  self
     */
    public function setGarden($garden)
    {
        $this->garden = $garden;

        return $this;
    }

    /**
     * Get the value of elevator
     *
     * @return  mixed
     */
    public function getElevator()
    {
        return $this->elevator;
    }

    /**
     * Set the value of elevator
     *
     * @param   mixed  $elevator  
     *
     * @return  self
     */
    public function setElevator($elevator)
    {
        $this->elevator = $elevator;

        return $this;
    }

    /**
     * Get the value of yard
     *
     * @return  mixed
     */
    public function getYard()
    {
        return $this->yard;
    }

    /**
     * Set the value of yard
     *
     * @param   mixed  $yard  
     *
     * @return  self
     */
    public function setYard($yard)
    {
        $this->yard = $yard;

        return $this;
    }

    /**
     * Get the value of pets
     *
     * @return  mixed
     */
    public function getPets()
    {
        return $this->pets;
    }

    /**
     * Set the value of pets
     *
     * @param   mixed  $pets  
     *
     * @return  self
     */
    public function setPets($pets)
    {
        $this->pets = $pets;

        return $this;
    }

    /**
     * Get the value of smoker
     *
     * @return  mixed
     */
    public function getSmoker()
    {
        return $this->smoker;
    }

    /**
     * Set the value of smoker
     *
     * @param   mixed  $smoker  
     *
     * @return  self
     */
    public function setSmoker($smoker)
    {
        $this->smoker = $smoker;

        return $this;
    }

    /**
     * Get the value of near_school
     *
     * @return  mixed
     */
    public function getNear_school()
    {
        return $this->near_school;
    }

    /**
     * Set the value of near_school
     *
     * @param   mixed  $near_school  
     *
     * @return  self
     */
    public function setNear_school($near_school)
    {
        $this->near_school = $near_school;

        return $this;
    }

    /**
     * Get the value of near_park
     *
     * @return  mixed
     */
    public function getNear_park()
    {
        return $this->near_park;
    }

    /**
     * Set the value of near_park
     *
     * @param   mixed  $near_park  
     *
     * @return  self
     */
    public function setNear_park($near_park)
    {
        $this->near_park = $near_park;

        return $this;
    }

    /**
     * Get the value of near_sea
     *
     * @return  mixed
     */
    public function getNear_sea()
    {
        return $this->near_sea;
    }

    /**
     * Set the value of near_sea
     *
     * @param   mixed  $near_sea  
     *
     * @return  self
     */
    public function setNear_sea($near_sea)
    {
        $this->near_sea = $near_sea;

        return $this;
    }

    /**
     * Get the value of near_walk
     *
     * @return  mixed
     */
    public function getNear_walk()
    {
        return $this->near_walk;
    }

    /**
     * Set the value of near_walk
     *
     * @param   mixed  $near_walk  
     *
     * @return  self
     */
    public function setNear_walk($near_walk)
    {
        $this->near_walk = $near_walk;

        return $this;
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
}