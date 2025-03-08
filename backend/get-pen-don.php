



<?php
    include "connect.php";

    session_start();



    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from items where donation_status='pending'");

        if(mysqli_num_rows($get)<1){
            echo json_encode([
                "status" => "empty"
            ]);

            exit();
        }


        while($row=mysqli_fetch_assoc($get)){
            $data[]=[
                "photo" => $row["photo"],
                "name" => $row["name"],
                "upload_date" => $row["upload_date"],
                "quality" => $row["state"],
                "donor" => $row["donor"],
                "donor_email" => $row["donor_email"],
                "id" => $row["id"],
            ];
        }


   echo json_encode($data);
?>