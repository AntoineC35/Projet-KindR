<?php 
class Disponibility {
    private int $id;
    public function __construct(private int $user_id, private string $start_datetime, private string $end_datetime)
    {
        
    }

    public function toArray() :array {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "start_datetime" => $this->start_datetime,
            "end_datetime" => $this->end_datetime
        ];
    }

    /**
     * Get the value of id
     *
     * @return  mixed
     */
    public function getId() :int 
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
    public function setId(int $id) :self
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of user_id
     *
     * @return  mixed
     */
    public function getUser_id() :int 
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
    public function setUser_id(int $user_id) :self
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * Get the value of start_datetime
     *
     * @return  mixed
     */
    public function getStart_datetime() :string 
    {
        return $this->start_datetime;
    }

    /**
     * Set the value of start_datetime
     *
     * @param   mixed  $start_datetime  
     *
     * @return  self
     */
    public function setStart_datetime(string $start_datetime) :self
    {
        $this->start_datetime = $start_datetime;

        return $this;
    }

    /**
     * Get the value of end_datetime
     *
     * @return  mixed
     */
    public function getEnd_datetime() :string 
    {
        return $this->end_datetime;
    }

    /**
     * Set the value of end_datetime
     *
     * @param   mixed  $end_datetime  
     *
     * @return  self
     */
    public function setEnd_datetime(string $end_datetime) :self
    {
        $this->end_datetime = $end_datetime;

        return $this;
    }
}