<?php 
class Activite {
    private int $id;
    public function __construct(private int $user_id, private string $game_space, private string $library, private string $show, private string $pool, private string $playground, private string $walk, private string $cinema, private string $collective_playspace)
    {
        
    }

    public function toArray() 
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
    public function getCollective_playspace()
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
    public function setCollective_playspace($collective_playspace)
    {
        $this->collective_playspace = $collective_playspace;

        return $this;
    }

    /**
     * Get the value of cinema
     *
     * @return  mixed
     */
    public function getCinema()
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
    public function setCinema($cinema)
    {
        $this->cinema = $cinema;

        return $this;
    }

    /**
     * Get the value of walk
     *
     * @return  mixed
     */
    public function getWalk()
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
    public function setWalk($walk)
    {
        $this->walk = $walk;

        return $this;
    }

    /**
     * Get the value of playground
     *
     * @return  mixed
     */
    public function getPlayground()
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
    public function setPlayground($playground)
    {
        $this->playground = $playground;

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
     * Get the value of show
     *
     * @return  mixed
     */
    public function getShow()
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
    public function setShow($show)
    {
        $this->show = $show;

        return $this;
    }

    /**
     * Get the value of library
     *
     * @return  mixed
     */
    public function getLibrary()
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
    public function setLibrary($library)
    {
        $this->library = $library;

        return $this;
    }

    /**
     * Get the value of game_space
     *
     * @return  mixed
     */
    public function getGame_space()
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
    public function setGame_space($game_space)
    {
        $this->game_space = $game_space;

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