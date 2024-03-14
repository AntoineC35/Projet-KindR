<?php

class Post{
    private int $id;
    public function __construct(private string $title,private string $date, private string $content, private string $link, private string $address, private Category $category, private string $img_url, private string $img_alt) {

    }

    public function toArray() 
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "date" => $this->date,
            "content" => $this->content,
            "link" => $this->link,
            "address" => $this->address,
            "category" => $this->category->toArray(),
            "img_url" => $this->img_url,
            "img_alt" => $this->img_alt
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
     * Get the value of title
     *
     * @return  mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set the value of title
     *
     * @param   mixed  $title  
     *
     * @return  self
     */
    public function setTitle($title)
    {
        $this->title = $title;

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
     * Get the value of category
     *
     * @return  mixed
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set the value of category
     *
     * @param   mixed  $category  
     *
     * @return  self
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get the value of img_url
     *
     * @return  mixed
     */
    public function getImg_url()
    {
        return $this->img_url;
    }

    /**
     * Set the value of img_url
     *
     * @param   mixed  $img_url  
     *
     * @return  self
     */
    public function setImg_url($img_url)
    {
        $this->img_url = $img_url;

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
     * Get the value of img_alt
     *
     * @return  mixed
     */
    public function getImg_alt()
    {
        return $this->img_alt;
    }

    /**
     * Set the value of img_alt
     *
     * @param   mixed  $img_alt  
     *
     * @return  self
     */
    public function setImg_alt($img_alt)
    {
        $this->img_alt = $img_alt;

        return $this;
    }

    /**
     * Get the value of link
     *
     * @return  mixed
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * Set the value of link
     *
     * @param   mixed  $link  
     *
     * @return  self
     */
    public function setLink($link)
    {
        $this->link = $link;

        return $this;
    }
}