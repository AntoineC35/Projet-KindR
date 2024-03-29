<?php

class Message {
    private int $id;
    public function __construct(private int $conversation_id, private int $user_id, private string $content, private string $date)
    {
        
    }

    public function toArray() :array {
        return [
            "id" => $this->id,
            "conversation_id" => $this->conversation_id,
            "user_id" => $this->user_id,
            "content" => $this->content,
            "date" => $this->date
        ];
    }

    /**
     * Get the value of conversation_id
     *
     * @return  mixed
     */
    public function getConversation_id() :int
    {
        return $this->conversation_id;
    }

    /**
     * Set the value of conversation_id
     *
     * @param   mixed  $conversation_id  
     *
     * @return  self
     */
    public function setConversation_id(int $conversation_id) :self
    {
        $this->conversation_id = $conversation_id;

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
     * Get the value of content
     *
     * @return  mixed
     */
    public function getContent() :string
    {
        return $this->content;
    }

    /**
     * Set the value of content
     *
     * @param   mixed  $content  
     *
     * @return  self
     */
    public function setContent(string $content) :self
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get the value of date
     *
     * @return  mixed
     */
    public function getDate() :string
    {
        return $this->date;
    }

    /**
     * Set the value of date
     *
     * @param   mixed  $date  
     *
     * @return  self
     */
    public function setDate(string $date) :self
    {
        $this->date = $date;

        return $this;
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
}