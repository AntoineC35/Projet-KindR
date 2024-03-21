<?php

class CategoryManager extends AbstractManager {

    public function findAllCategory() {
        $query = $this->db->prepare('SELECT * FROM categories');
        $query->execute();
        $categories = $query->fetchAll(PDO::FETCH_ASSOC);
        $categoriesArray = [];
        foreach($categories as $category) {
            $newCategory = new Category($category["type"], $category["description"]);
            $newCategory->setId($category["id"]);
            $categoriesArray[] = $newCategory->toArray();
        }
        return $categoriesArray;
    }

    public function findById($category_id) {
        $query = $this->db->prepare('SELECT * FROM categories WHERE id = :id');
        $parameters = [
            "id" => $category_id
        ];
        $query->execute($parameters);
        $category = $query->fetch(PDO::FETCH_ASSOC);
        if ($category != null) {
            $newCategory = new Category($category["type"], $category["description"]);
            $newCategory->setId($category["id"]);
            return $newCategory;
        }
    }

    public function createCategory(Category $category) {
        $query = $this->db->prepare('INSERT INTO categories VALUES(null, :type, :description)');
        $parameters = [
            "type" => $category->getType(),
            "description" => $category->getDescription(),
        ];
        $query->execute($parameters);
        $lastId = $this->db->lastInsertId();
        return $this->findById($lastId);
    }

    public function deleteCategory(Category $category) {
        $query = $this->db->prepare("DELETE FROM category WHERE id = :category_id");
        $parameters = [
            "category_id" => $category->getId()
        ];
        $query->execute($parameters);
    }
}