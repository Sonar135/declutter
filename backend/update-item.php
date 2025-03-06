



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }


    $id= $_POST["id"];
    $photo= $_POST["img_input"];
    $name= $_POST["name"];




    $query= mysqli_query($conn, "UPDATE items set photo='$photo', name='$name' where id='$id'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>