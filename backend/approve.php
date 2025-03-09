



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }


    $photo= $_POST["img_input"];
    $temp_img=$_FILES['image']['tmp_name'];


   

    if(!empty($temp_img)){
        move_uploaded_file($temp_img, "../id_card/$photo");
    }

 
    $query= mysqli_query($conn, "UPDATE users set photo='$photo', is_approved='pending' where email='$email'");

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }
 

 

   
?>