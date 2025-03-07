
<?php
 
    include 'functions.php';
    include 'connect.php';




        $email=$_POST['email'];
        $fname=$_POST['name'];
        $matric=$_POST['matric'];
        $phone=$_POST['phone'];
        $hall=$_POST['hall'];
        $password=$_POST['password'];
        $confirm=$_POST['confirm'];
        $img_input=$_POST['img_input'];
        $confirm=$_POST['confirm'];
        $temp_img=$_FILES['image']['tmp_name'];



     
        create_user($conn, $email, $fname,  $password, $phone, $hall, $matric, $img_input, $temp_img );

    

  

        if(invalid_email($email)!== false){
            echo json_encode([
                "status"=>"invalid_email"
            ]);
        exit();
        }

        if(pwd_match($password, $confirm)!== false){
      
            echo json_encode([
                "status"=>"pwd_match"
            ]);
            exit();
        }

        if (invalid_password($password)) {
            echo json_encode([
                "status"=>"invalid_pass"
            ]);
            exit();
 
        }

        if(email_exists($conn, $email)!== false){
            echo json_encode([
                "status"=>"email_exists"
            ]);
      
            exit();
        }


        if(matric_exists($conn, $email)!== false){
            echo json_encode([
                "status"=>"matric_exists"
            ]);
      
            exit();
        }
     

     
    
        

?>


