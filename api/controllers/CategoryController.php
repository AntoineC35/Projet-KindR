<?php

class CategoryController extends AbstractController{
    private CategoryManager $cm;
    public function __construct()
    {
        $this->cm = new CategoryManager();    
    }

    public function findAll() {
        $categories = $this->cm->findAllCategory();
        if ($categories != null) {
            $this->render(["success" => true, "categories" => $categories]);
        } else {
            $this->render(["success"=> false, "errorMessage" => "No categories to display"]);
        }
    }

    public function createCategory($post) {
        $type = htmlspecialchars($post["type"]);
        $description = htmlspecialchars($post["description"]);
        $newCategory = new Category($type, $description);
        $createNewCat = $this->cm->createCategory($newCategory);
        if($createNewCat != null ) {
            $this->render(["success" => true, "categorie" => $createNewCat]);
        } else {
            $this->render(["success"=> false, "errorMessage" => "problem creating categorie"]);
        }
    }
}