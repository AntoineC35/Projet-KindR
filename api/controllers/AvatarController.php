<?php

class AvatarController extends AbstractController {

    private CSRFTokenManager $tokenManager;
    private AvatarManager $avm;
    public function __construct()
    {
        $this->tokenManager = new CSRFTokenManager();
        $this->avm = new AvatarManager;
    }

    public function createAvatar(array $post) {
        if ($this->tokenManager->validateCSRFToken($post["csrf_token"])) {
            $avatar = $this->avm->createAvatar($post);
            if ($avatar != null) {
                $this->render(["avatar" => $avatar->toArray()]);
            } else {
                $this->render(["errorMessage" => "Issue with creating Avatar"]);
            }
        }
    }

    public function findAvatarByUserId($user_id) {
        $avatar = $this->avm->findByUserId($user_id);
        if ($avatar != null) {
            $this->render(["avatar" => $avatar->toArray()]);
        } else {
            $this->render(["errorMessage" => "Nothing found"]);
        }
    }
}