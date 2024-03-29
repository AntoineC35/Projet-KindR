<?php
session_start();

header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header('content-type: application/json; charset=utf-8');

require "vendor/autoload.php";
require "autoload.php";

// charge le contenu du .env dans $_ENV
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if (!isset($_SESSION["csrf_token"])) {
    $newInstanceCSRFController = new CSRFTokenManager();
    $_SESSION["csrf_token"] = $newInstanceCSRFController->generateCSRFToken();
}

// if (!isset($_SESSION['session_user']->csrf_token)) {
//     $newInstanceCSRFController = new CSRFTokenManager();
//     $newAuthController = new AuthController();
//     $newAuthController->appendToSessionCSRF(json_encode($newInstanceCSRFController->generateCSRFToken()));
// }


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
