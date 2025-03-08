



<?php
    include "connect.php";

    session_start();

  


    $id= $_POST["id"];
    $reason= $_POST["reason"];




    $query= mysqli_query($conn, "UPDATE users set is_donor='no' where id='$id'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>