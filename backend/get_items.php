



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }


    $filters=[];
    $where = "";

    if (!empty($_GET['condition'])) {
        $condition = mysqli_real_escape_string($conn, $_GET['condition']);
        $filters[] = "state = '$condition'";
    }
    
    
    if (!empty($_GET['search'])) {
        $search = mysqli_real_escape_string($conn, $_GET['search']);
        $filters[] = "name like '%$search%' or keywords like '%$search%'";
    }


    if (count($filters) > 0) {
        $where = " AND " . implode(" AND ", $filters);
    }
    
    


    
    $data=[];

    $get = mysqli_query($conn, "SELECT * FROM items WHERE donation_status='approved' AND (claim_status='' OR claim_status='disputed') $where");


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