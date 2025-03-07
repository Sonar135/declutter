



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }






    $query= mysqli_query($conn, "UPDATE users set is_donor='pending' where email='$email'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>