<?php

class Avatar {
    private int $id;
    public function __construct(private int $user_id, private string $avatar_url, private string $avatar_alt)
    {
        
    }

    public function toArray()
    {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "avatar_url" => $this->avatar_url,
            "avatar_alt" => $this->avatar_alt
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
     * Get the value of avatar_url
     *
     * @return  mixed
     */
    public function getAvatar_url()
    {
        return $this->avatar_url;
    }

    /**
     * Set the value of avatar_url
     *
     * @param   mixed  $avatar_url  
     *
     * @return  self
     */
    public function setAvatar_url($avatar_url)
    {
        $this->avatar_url = $avatar_url;

        return $this;
    }

    /**
     * Get the value of avatar_alt
     *
     * @return  mixed
     */
    public function getAvatar_alt()
    {
        return $this->avatar_alt;
    }

    /**
     * Set the value of avatar_alt
     *
     * @param   mixed  $avatar_alt  
     *
     * @return  self
     */
    public function setAvatar_alt($avatar_alt)
    {
        $this->avatar_alt = $avatar_alt;

        return $this;
    }
}