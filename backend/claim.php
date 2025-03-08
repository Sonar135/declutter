



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


    $is_approved=mysqli_query($conn, "SELECT * FROM users WHERE email='$email' and is_approved='approved'");

    if(mysqli_num_rows($is_approved)<1){
        echo json_encode([
            "status" => "not_approved"
        ]);

        exit();
    }



    $query= mysqli_query($conn, "UPDATE items set claim_status='$status', recipient='$user', recipient_no='$phone', recipient_email='$email', claim_date=CURDATE() where id='$id'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>