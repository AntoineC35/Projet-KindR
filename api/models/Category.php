<?php

class Category {
    private int $id;
    public function __construct(private string $type, private string $description)
    {
        
    }
    public function toArray() :array
    {
        return [
            "id" => $this->id,
            "type" => $this->type,
            "description" => $this->description,
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
     * Get the value of type
     *
     * @return  mixed
     */
    public function getType() :string
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
    public function setType(string $type) :self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get the value of description
     *
     * @return  mixed
     */
    public function getDescription() :string
    {
        return $this->description;
    }

    /**
     * Set the value of description
     *
     * @param   mixed  $description  
     *
     * @return  self
     */
    public function setDescription(string $description) :self
    {
        $this->description = $description;

        return $this;
    }
}