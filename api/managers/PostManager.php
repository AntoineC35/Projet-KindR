<?php

class PostManager extends AbstractManager {

    public function findAll() :?array {
        $query = $this->db->prepare('SELECT * FROM posts');
        $query->execute();
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
        return $posts;
    }

    public function findById(int $post_id) :?array {
        $query = $this->db->prepare('SELECT * FROM posts WHERE id = :id');
        $parameters = [
            "id" => $post_id
        ];
        $query->execute($parameters);
        $post = $query->fetch(PDO::FETCH_ASSOC);
        return $post;
    }
    
    public function createPost($post) :?array {
        $query = $this->db->prepare('
            INSERT INTO posts 
            (title, date, content, address, link, category, img_url, img_alt)
            VALUES
            (:title, :date, :content, :address, :link, :category, :img_url, :img_alt)
        ');
        $parameters = [
            "title" => $post->getTitle(),
            "date" => $post->getDate(),
            "content" => $post->getContent(),
            "address" => $post->getAddress(),
            "category" => $post->getCategory()->getId(),
            "link" => $post->getLink(),
            "img_url" => $post->getImg_url(),
            "img_alt" => $post->getImg_alt(),
        ];
        $query->execute($parameters);
        $lastId = $this->db->lastInsertId();
        return $this->findById($lastId);
    }

    public function findAllByCategories(Category $category) :?array {
        $query = $this->db->prepare('SELECT * FROM posts WHERE category = :category');
        $parameters = [
            "category" => $category->getId()
        ];
        $query->execute($parameters);
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
        return $posts;
    }

    public function deletePost(Post $post) :void {
        $query = $this->db->prepare("DELETE FROM posts WHERE id = :post_id");
        $parameters = [
            "post_id" => $post->getId()
        ];
        $query->execute($parameters);

    }
}