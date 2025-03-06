



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }

    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from items where donor_email='$email'");

        $num=mysqli_num_rows($get);

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
                "claim_status" => $row["claim_status"],
                "claim_date" => $row["claim_date"],
                "delivery_date" => $row["delivery_date"],
                "donation_status" => $row["donation_status"],
                "recipient" => $row["recipient"],
                "num" => $num,
            ];
        }


   echo json_encode($data);
?>