



<?php
    include "connect.php";

    session_start();

    if(isset($_SESSION["id"])){
        $email=$_SESSION["email"];
        $user=$_SESSION["name"];
        $phone=$_SESSION["phone"];
    }


    $img = $_POST["img_input"];
    $name = $_POST["name"];
    $keywords = $_POST["keywords"];
    $condition = $_POST["condition"];
    $temp_img=$_FILES['image']['tmp_name'];
    $status="pending";

    move_uploaded_file($temp_img, "../images/$img");
    $insert=mysqli_query($conn, "INSERT into items (photo, name, keywords, state, donor, donor_no, donor_email, upload_date, donation_status)
     values('$img', '$name', '$keywords', '$condition', '$user', '$phone', '$email', CURDATE(), '$status')");


   
?>