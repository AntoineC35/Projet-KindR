<?php

class PostController extends AbstractController {

    private CategoryManager $cm;
    private PostManager $pm;

    public function __construct() {
        $this->cm = new CategoryManager();
        $this->pm = new PostManager();
    }

    public function findAll() :void {
        $posts = $this->pm->findAll();
        $postsArray = [];
        if($posts != null) {
            foreach($posts as $post) {
                $category = $this->cm->findById($post["category"]);
                $newPost = new Post($post["title"], $post["date"], $post["content"], $post["link"], $post["address"], $category, $post["img_url"], $post["img_alt"]);
                $newPost->setId($post["id"]);
                $postsArray[] = $newPost->toArray();
            }
            $this->render(["success"=> true, "posts" => $postsArray]);
        } else {
            $this->render(["success"=> false, "errorMessage" => "No posts to display"]);
        }
    }

    public function findById(int $post_id) :void {
        $post = $this->findById($post_id);
        if ($post != null) {
            $category = $this->cm->findById($post["category"]);
            $newPost = new Post($post["title"], $post["date"], $post["content"], $post["link"], $post["address"], $category, $post["img_url"], $post["img_alt"]);
            $newPost->setId($post["id"]);
            $this->render(["succes" => true, "post" => $newPost->toArray()]);
        } else {
            $this->render(["success"=> false, "errorMessage" => "post not found"]);
        }
    }

    public function createPost(array $post) :null|array {
        $category = $this->cm->findById($post["category"]);
        $newPost = new Post(
            htmlspecialchars($post["title"]),
            htmlspecialchars($post["date"]),
            htmlspecialchars($post["content"]),
            htmlspecialchars($post["link"]),
            htmlspecialchars($post["address"]),
            $category,
            htmlspecialchars($post["img_url"]),
            htmlspecialchars($post["img_alt"])
        );
        return $this->pm->createPost($newPost);
    }

    public function findAllByCategories(array $post) :void {
        $category = $this->cm->findById($post["category"]);
        $posts = $this->pm->findAllByCategories($category);
        if($posts != null) {
            foreach($posts as $post) {
                $category = $this->cm->findById($post["category"]);
                $newPost = new Post($post["title"], $post["date"], $post["content"], $post["link"], $post["address"], $category, $post["img_url"], $post["img_alt"]);
                $newPost->setId($post["id"]);
                $postsArray[] = $newPost->toArray();
            }
            $this->render(["success"=> true, "posts" => $postsArray]);
        } else {
            $this->render(["success"=> false, "errorMessage" => "No posts to display"]);
        }
    }
        
}