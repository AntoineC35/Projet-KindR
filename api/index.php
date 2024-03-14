<?php
// charge l'autoload de composer
session_start();
require "vendor/autoload.php";
require "autoload.php";

// charge le contenu du .env dans $_ENV
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if (!isset($_SESSION['session_user']->csrf_token)) {
    $newInstanceCSRFController = new CSRFTokenManager();
    $newAuthController = new AuthController();
    $newAuthController->appendToSessionCSRF(json_encode($newInstanceCSRFController->generateCSRFToken()));
}


try {
    
    $router = new Router();

    if(isset($_GET['path']))
    {
        $request = "/".$_GET['path'];
    }
    else
    {
        $request = "/";
    }
    
    $router->route($routes, $request);
}
catch(Exception $e)
{
    if($e->getCode() === 404)
    {
        
    }
}
