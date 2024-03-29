<?php

class Post{
    private int $id;
    public function __construct(private string $title,private string $date, private string $content, private string $link, private string $address, private Category $category, private string $img_url, private string $img_alt) {

    }

    public function toArray() :array
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
     * Get the value of title
     *
     * @return  mixed
     */
    public function getTitle() :string
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
    public function setTitle(string $title) :self
    {
        $this->title = $title;

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
     * Get the value of address
     *
     * @return  mixed
     */
    public function getAddress() :string
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
    public function setAddress(string $address) :self
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get the value of category
     *
     * @return  mixed
     */
    public function getCategory() :Category
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
    public function setCategory(Category $category) :self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get the value of img_url
     *
     * @return  mixed
     */
    public function getImg_url() :string
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
    public function setImg_url(string $img_url) :self
    {
        $this->img_url = $img_url;

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
     * Get the value of img_alt
     *
     * @return  mixed
     */
    public function getImg_alt() :string
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
    public function setImg_alt(string $img_alt) :self
    {
        $this->img_alt = $img_alt;

        return $this;
    }

    /**
     * Get the value of link
     *
     * @return  mixed
     */
    public function getLink() :string
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
    public function setLink(string $link) :self
    {
        $this->link = $link;

        return $this;
    }
}