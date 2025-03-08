



<?php
    include "connect.php";

    session_start();

 

    $id= $_POST["id"];




    $query= mysqli_query($conn, "UPDATE items set claim_status='disputed' where id='$id'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>