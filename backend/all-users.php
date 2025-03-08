



<?php
    include "connect.php";

    session_start();



    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from users where is_donor!='yes' and type='user'");

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
                "id" => $row["id"],
                "phone" => $row["phone"],
               
            ];
        }


   echo json_encode($data);
?>