<?php
    session_start();

    $data=[
        "status"=> "logged out"
    ];
    
    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $type=$_SESSION["type"];
        $isDonor=$_SESSION["is_donor"];

        $data=[
            "status"=> "logged in",
            "email"=> $email,
            "type"=> $type,
            "isDonor"=> $isDonor,
        ];
    }



    echo json_encode($data);
?>