<?php

/**
 * @author : Gaellan 
 */
/* MODELS */
require "models/User.php";
require "models/Address.php";
require "models/Place.php";
require "models/Activite.php";
require "models/Situation.php";
require "models/Message.php";
require "models/Conversation.php";
require "models/Disponibility.php";
require "models/Avatar.php";
require "models/Category.php";
require "models/Post.php";
/* MANAGERS */
require "managers/AbstractManager.php";
require "managers/UserManager.php";
require "managers/AddressManager.php";
require "managers/PlaceManager.php";
require "managers/ActiviteManager.php";
require "managers/SituationManager.php";
require "managers/MessageManager.php";
require "managers/ConversationManager.php";
require "managers/DisponibilityManager.php";
require "managers/AvatarManager.php";
require "managers/CategoryManager.php";
require "managers/PostManager.php";
/* CONTROLLERS */
require "controllers/AbstractController.php";
require "controllers/AuthController.php";
require "controllers/UserController.php";
require "controllers/AddressController.php";
require "controllers/PlaceController.php";
require "controllers/ActiviteController.php";
require "controllers/SituationController.php";
require "controllers/ConversationController.php";
require "controllers/DisponibilityController.php";
require "controllers/AvatarController.php";
require "controllers/CategoryController.php";
require "controllers/PostController.php";
/* SERVICES */
require "services/CSRFTokenManager.php";
require "services/Router.php";






$routes = [];

// Read the routes config file
$handle = fopen("config/routes.txt", "r");

if ($handle) { // if the file exists

    while (($line = fgets($handle)) !== false) { // read it line by line

        $route = []; // each route is an array

        $routeData = explode(" ", str_replace(PHP_EOL, '', $line)); // divide the line in two strings (cut at the " ")

        $route["path"] = $routeData[0]; // the path is what was before the " "

        if(substr_count($route["path"], "/") > 1) // check if the path string has more than 1 "/"
        {
            $route["parameter"] = true; // the route expects a parameter
            $pathData = explode("/", $route["path"]); // divide the path in three strings (cut at the "/")
            $route["path"] = "/".$pathData[1]; // isolate the path without the parameters
        }
        else
        {
            $route["parameter"] = false; // the route does not expect a parameter
        }

        $controllerString = $routeData[1]; // the controller string is what was after the " ";

        $controllerData = explode(":", $controllerString); // divide the controller string in two strings (cut at the ":")

        $route["controller"] = $controllerData[0]; // the controller is what was before the ":"

        $route["method"] = $controllerData[1]; // the method is what was after the ":"

        $routes[] = $route; // add the new route to the routes array
    }

    fclose($handle); // close the file
}

$fake_session = file_get_contents("config/fakeSession.json");
$_SESSION["session_user"] = json_decode($fake_session);

