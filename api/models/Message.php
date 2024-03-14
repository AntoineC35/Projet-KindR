<?php

class Message {
    private int $id;
    public function __construct(private int $conversation_id, private int $user_id, private string $content, private string $date)
    {
        
    }

    public function toArray() {
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
    public function getConversation_id()
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
    public function setConversation_id($conversation_id)
    {
        $this->conversation_id = $conversation_id;

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
     * Get the value of content
     *
     * @return  mixed
     */
    public function getContent()
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
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get the value of date
     *
     * @return  mixed
     */
    public function getDate()
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
    public function setDate($date)
    {
        $this->date = $date;

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