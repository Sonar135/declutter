



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }

    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from items where recipient_email='$email'");

        if(mysqli_num_rows($get)<1){
            echo json_encode([
                "status" => "empty"
            ]);

            exit();
        }


        while($row=mysqli_fetch_assoc($get)){
            $data[]=[
                "id" => $row["id"],
                "name" => $row["name"],
                "photo" => $row["photo"],
                "state" => $row["state"],
                "status" => $row["claim_status"],
                "claim_date" => $row["claim_date"],
                "delivery_date" => $row["delivery_date"],
            ];
        }


   echo json_encode($data);
?>



