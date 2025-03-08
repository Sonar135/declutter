



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }

    
    $data=[];

        $get=mysqli_query($conn, "SELECT * from items where recipient_email='$email' and claim_status='completed'");

        $num= mysqli_num_rows($get);
         
               
         

            $data=[
                "status" => "success",
                "num" => $num,
            ];
        


   echo json_encode($data);
?>



