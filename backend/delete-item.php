



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }


    $id= $_POST["id"];





    $query= mysqli_query($conn, "DELETE from items where id='$id'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>