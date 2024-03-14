<?php

class Situation {
    private int $id;
    public function __construct(private int $user_id, private int $age, private string $formation, private string $situation, private string $experience, private string $kids, private string $date_agrement, private string $other_adults, private int $total_capacity) 
    {
        
    }

    public function toArray() {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "age" => $this->age,
            "formation" => $this->formation,
            "situation" => $this->situation,
            "experience" => $this->experience,
            "kids" => $this->kids,
            "date_agrement" => $this->date_agrement,
            "other_adults" => $this->other_adults,
            "total_capacity" => $this->total_capacity
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
     * Get the value of age
     *
     * @return  mixed
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * Set the value of age
     *
     * @param   mixed  $age  
     *
     * @return  self
     */
    public function setAge($age)
    {
        $this->age = $age;

        return $this;
    }

    /**
     * Get the value of formation
     *
     * @return  mixed
     */
    public function getFormation()
    {
        return $this->formation;
    }

    /**
     * Set the value of formation
     *
     * @param   mixed  $formation  
     *
     * @return  self
     */
    public function setFormation($formation)
    {
        $this->formation = $formation;

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
     * Get the value of experience
     *
     * @return  mixed
     */
    public function getExperience()
    {
        return $this->experience;
    }

    /**
     * Set the value of experience
     *
     * @param   mixed  $experience  
     *
     * @return  self
     */
    public function setExperience($experience)
    {
        $this->experience = $experience;

        return $this;
    }

    /**
     * Get the value of kids
     *
     * @return  mixed
     */
    public function getKids()
    {
        return $this->kids;
    }

    /**
     * Set the value of kids
     *
     * @param   mixed  $kids  
     *
     * @return  self
     */
    public function setKids($kids)
    {
        $this->kids = $kids;

        return $this;
    }

    /**
     * Get the value of date_agrement
     *
     * @return  mixed
     */
    public function getDate_agrement()
    {
        return $this->date_agrement;
    }

    /**
     * Set the value of date_agrement
     *
     * @param   mixed  $date_agrement  
     *
     * @return  self
     */
    public function setDate_agrement($date_agrement)
    {
        $this->date_agrement = $date_agrement;

        return $this;
    }

    /**
     * Get the value of other_adults
     *
     * @return  mixed
     */
    public function getOther_adults()
    {
        return $this->other_adults;
    }

    /**
     * Set the value of other_adults
     *
     * @param   mixed  $other_adults  
     *
     * @return  self
     */
    public function setOther_adults($other_adults)
    {
        $this->other_adults = $other_adults;

        return $this;
    }

    /**
     * Get the value of total_capacity
     *
     * @return  mixed
     */
    public function getTotal_capacity()
    {
        return $this->total_capacity;
    }

    /**
     * Set the value of total_capacity
     *
     * @param   mixed  $total_capacity  
     *
     * @return  self
     */
    public function setTotal_capacity($total_capacity)
    {
        $this->total_capacity = $total_capacity;

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