



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }


    if(isset($_GET["v"])){
        $v=$_GET["v"];
    }

    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from users where email='$v'");

        if(mysqli_num_rows($get)<1){
            echo json_encode([
                "status" => "empty"
            ]);

            exit();
        }


        while($row=mysqli_fetch_assoc($get)){
            $data[]=[
                "name" => $row["name"],
                "matric" => $row["matric"],
                "phone" => $row["phone"],
                "hall" => $row["hall"],
                "email" => $row["email"],
                "tier" => $row["is_donor"],
            ];
        }


   echo json_encode($data);
?>