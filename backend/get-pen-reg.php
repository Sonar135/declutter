



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }

    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from users where is_approved='pending'");

        if(mysqli_num_rows($get)<1){
            echo json_encode([
                "status" => "empty"
            ]);
        }


        while($row=mysqli_fetch_assoc($get)){
            $data[]=[
                "name" => $row["name"],
                "matric" => $row["matric"],
                "phone" => $row["phone"],
                "email" => $row["email"],
                "id" => $row["id"],
                "photo" => $row["photo"],
            ];
        }


   echo json_encode($data);
?>