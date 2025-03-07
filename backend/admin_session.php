<?php
    session_start();

    $data=[
        "status"=> "logged out"
    ];
    
    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $type=$_SESSION["type"];

        $data=[
            "status"=> "logged in",
            "email"=> $email,
            "type"=> $type,
        ];
    }


    


    echo json_encode($data);
?>