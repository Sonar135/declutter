



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }


    $id = $_POST["id"];

    $status="claimed";


    $query= mysqli_query($conn, "UPDATE items set claim_status='$status', recipient='$user', recipient_no='$phone', recipient_email='$email', claim_date=CURDATE() where id='$id'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>