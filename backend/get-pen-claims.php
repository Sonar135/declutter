



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }

    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from items where claim_status!='complete'");

        if(mysqli_num_rows($get)<1){
            echo json_encode([
                "status" => "empty"
            ]);
        }


        while($row=mysqli_fetch_assoc($get)){
            $data[]=[
                "id" => $row["id"],
                "name" => $row["name"],
                "recipient" => $row["recipient"],
                "recipient_no" => $row["recipient_no"],
                "donor" => $row["donor"],
                "donor_no" => $row["donor_no"],
                "claim_date" => $row["claim_date"],
                "claim_status" => $row["claim_status"],
                "photo" => $row["photo"],
            ];
        }


   echo json_encode($data);
?>