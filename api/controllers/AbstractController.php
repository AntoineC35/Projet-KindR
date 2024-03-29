<?php

abstract class AbstractController
{
    protected function render(array $values)  
    {  
        echo json_encode($values);  
    } 

    // protected function saveSession(string $content)
    // {
    //     file_put_contents("config/fakeSession.json", $content);
    // }

    // protected function deleteSession()
    // {
    //     file_put_contents("config/fakeSession.json", " ");
    // }

    // protected function appendToSession(string $content)
    // {
    //     $sessionFile = "config/fakeSession.json";
    //     $existingContent = file_get_contents($sessionFile);
    //     $data = json_decode($existingContent, true);
    //     $data["status"] = json_decode($content, true);
    //     $updatedContent = json_encode($data);
    //     file_put_contents($sessionFile, $updatedContent);
    // }

    // protected function saveUserToSession(string $content)
    // {
    //     $sessionFile = "config/fakeSession.json";
    //     $existingContent = file_get_contents($sessionFile);
    //     $data = json_decode($existingContent, true);
    //     $data["user"] = json_decode($content, true);
    //     $updatedContent = json_encode($data);
    //     file_put_contents($sessionFile, $updatedContent);
    // }
}