



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }

    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from items where donation_status='approved' and claim_status=''");

        if(mysqli_num_rows($get)<1){
            echo json_encode([
                "status" => "empty"
            ]);
        }


        while($row=mysqli_fetch_assoc($get)){
            $data[]=[
                "id" => $row["id"],
                "name" => $row["name"],
                "photo" => $row["photo"],
                "state" => $row["state"],
            ];
        }


   echo json_encode($data);
?>