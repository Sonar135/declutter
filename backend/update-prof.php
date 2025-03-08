



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }


    $name = $_POST["name"];
    $hall = $_POST["hall"];
    $phone = $_POST["phone"];



    $query= mysqli_query($conn, "UPDATE users set name='$name', hall='$hall',  phone='$phone' where email='$email' and type='user'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>