



<?php
    include "connect.php";

    session_start();




    $id= $_POST["id"];




    $query= mysqli_query($conn, "UPDATE users set is_donor='yes' where id='$id'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>