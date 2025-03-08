



<?php
    include "connect.php";

    session_start();


    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from items where claim_status='completed'");

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
                "recipient" => $row["recipient"],
                "donor" => $row["donor"],
                "photo" => $row["photo"],
                "delivery_date" => $row["delivery_date"],
            ];
        }


   echo json_encode($data);
?>