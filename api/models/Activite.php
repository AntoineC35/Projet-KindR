<?php 
class Activite {
    private int $id;
    public function __construct(private int $user_id, private string $game_space, private string $library, private string $show, private string $pool, private string $playground, private string $walk, private string $cinema, private string $collective_playspace)
    {
        
    }

    public function toArray() :array
    {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "game_space" => $this->game_space,
            "library" => $this->library,
            "show" => $this->show,
            "pool" => $this->pool,
            "playground" => $this->playground,
            "walk" => $this->walk,
            "cinema" => $this->cinema,
            "collective_playspace" => $this->collective_playspace 
        ];
    }

    /**
     * Get the value of collective_playspace
     *
     * @return  mixed
     */
    public function getCollective_playspace() :string
    {
        return $this->collective_playspace;
    }

    /**
     * Set the value of collective_playspace
     *
     * @param   mixed  $collective_playspace  
     *
     * @return  self
     */
    public function setCollective_playspace(string $collective_playspace) :self
    {
        $this->collective_playspace = $collective_playspace;

        return $this;
    }

    /**
     * Get the value of cinema
     *
     * @return  mixed
     */
    public function getCinema() :string
    {
        return $this->cinema;
    }

    /**
     * Set the value of cinema
     *
     * @param   mixed  $cinema  
     *
     * @return  self
     */
    public function setCinema(string $cinema) :self
    {
        $this->cinema = $cinema;

        return $this;
    }

    /**
     * Get the value of walk
     *
     * @return  mixed
     */
    public function getWalk() :string
    {
        return $this->walk;
    }

    /**
     * Set the value of walk
     *
     * @param   mixed  $walk  
     *
     * @return  self
     */
    public function setWalk(string $walk) :self
    {
        $this->walk = $walk;

        return $this;
    }

    /**
     * Get the value of playground
     *
     * @return  mixed
     */
    public function getPlayground() :string
    {
        return $this->playground;
    }

    /**
     * Set the value of playground
     *
     * @param   mixed  $playground  
     *
     * @return  self
     */
    public function setPlayground(string $playground) :self
    {
        $this->playground = $playground;

        return $this;
    }

    /**
     * Get the value of pool
     *
     * @return  mixed
     */
    public function getPool() :string
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
    public function setPool(string $pool) :self
    {
        $this->pool = $pool;

        return $this;
    }

    /**
     * Get the value of show
     *
     * @return  mixed
     */
    public function getShow() :string
    {
        return $this->show;
    }

    /**
     * Set the value of show
     *
     * @param   mixed  $show  
     *
     * @return  self
     */
    public function setShow(string $show) :self
    {
        $this->show = $show;

        return $this;
    }

    /**
     * Get the value of library
     *
     * @return  mixed
     */
    public function getLibrary() :string
    {
        return $this->library;
    }

    /**
     * Set the value of library
     *
     * @param   mixed  $library  
     *
     * @return  self
     */
    public function setLibrary(string $library) :self
    {
        $this->library = $library;

        return $this;
    }

    /**
     * Get the value of game_space
     *
     * @return  mixed
     */
    public function getGame_space() :string
    {
        return $this->game_space;
    }

    /**
     * Set the value of game_space
     *
     * @param   mixed  $game_space  
     *
     * @return  self
     */
    public function setGame_space(string $game_space) :self
    {
        $this->game_space = $game_space;

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