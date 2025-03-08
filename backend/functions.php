<?php
    include 'connect.php';


    
    function create_user($conn, $email, $fname, $password, $phone, $hall, $matric, $img_input, $temp_img){

   
        move_uploaded_file($temp_img, "../pictures/$img_input");
        $insert= "INSERT INTO users (name,  email,  password, phone, hall, matric, photo, type) VALUES (?,?,?,?,?,?,?,?)";   
        
      
        $type="user";
  

        $stmt2=mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt2, $insert)){
            header("location: user_auth.php?error=stmtfailed");
            exit();
        }
    
        
        $hashed_pwd=password_hash($password, PASSWORD_DEFAULT);

        mysqli_stmt_bind_param($stmt2, 'ssssssss', $fname,   $email,  $hashed_pwd, $phone, $hall, $matric, $img_input, $type);
        mysqli_stmt_execute($stmt2);
        mysqli_stmt_close($stmt2);
        
        echo json_encode([
            "status"=>"success"
        ]);
        exit();
    }







    function invalid_password($password){
        // Check if password contains at least one uppercase letter, one lowercase letter, and one special character
        if (!preg_match('/[A-Z]/', $password) || // Check for at least one uppercase letter
            !preg_match('/[a-z]/', $password) || // Check for at least one lowercase letter
            !preg_match('/[^a-zA-Z0-9]/', $password)) { // Check for at least one special character
            return true; // Password does not meet the criteria
        } else {
            return false; // Password meets the criteria
        }
    }

    function invalid_email($email){
        $result;
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $result= true;
        }

        else{
            $result= false;
        }

        return $result;
    
    }


    function pwd_match($password, $confirm){
        $result;
        if($password !== $confirm){
            $result= true;
        }
        
        else{
            $result=false;
        }
        return $result;
    }

    function email_exists($conn, $email){
        $result;
    
        $query="SELECT * FROM users WHERE email=?";
    
        $stmt=mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt, $query)){
            header("location: user_auth.php?error=stmtfailed");
            exit();
        }
    
        
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result= mysqli_stmt_get_result($stmt);
    
        if($row=mysqli_fetch_assoc($result)){
            return $row;
        }

        else{
            $result= false;
            return $result;
        }

        mysqli_stmt_close($stmt);
    }



    function matric_exists($conn, $matric){
        $result;
    
        $query="SELECT * FROM users WHERE matric=?";
    
        $stmt=mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt, $query)){
            header("location: user_auth.php?error=stmtfailed");
            exit();
        }
    
        
        mysqli_stmt_bind_param($stmt, "s", $matric);
        mysqli_stmt_execute($stmt);
        $result= mysqli_stmt_get_result($stmt);
    
        if($row=mysqli_fetch_assoc($result)){
            return $row;
        }

        else{
            $result= false;
            return $result;
        }

        mysqli_stmt_close($stmt);
    }




    

    function login($conn, $matric, $password){
        $uidexist= matric_exists($conn, $matric);

        if($uidexist===false){
            echo json_encode([
                "status"=>"invalid"
            ]);
            exit();
        }

        $pwdHashed=$uidexist["password"];
        $checkedpwd=password_verify($password, $pwdHashed);

        if($checkedpwd===false){
            echo json_encode([
                "status"=>"invalid"
            ]);
            exit();
        }

        else if($checkedpwd===true){

            $is_approved=mysqli_query($conn, "SELECT * FROM users WHERE matric='$matric' and is_approved='approved'");
            if($is_approved_row=mysqli_fetch_assoc($is_approved)){

                session_start();

                $_SESSION["id"]=$uidexist["id"];
                $_SESSION["email"]=$uidexist["email"];
                $_SESSION["name"]=$uidexist["name"];
                $_SESSION["phone"]=$uidexist["phone"];
                $_SESSION["type"]=$uidexist["type"];
                $_SESSION["is_donor"]=$uidexist["is_donor"];
                
              
         
       
             
    
                echo json_encode([
                    'status' => 'success',
                    'redirect_url' => 'catalogue.html'
                ]);
            }



            else if(!$is_approved_row){
                echo json_encode(['status' => 'unapproved']);
              }

      
        }
    }

















    // creating the restaurant...............................................................................................................//////////////////////////




    function admin_exists($conn, $email){
        $result;
    
        $query="SELECT * FROM users WHERE email=? and type='admin'";
    
        $stmt=mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt, $query)){
            header("location: res_auth.php?error=stmtfailed");
            exit();
        }
    
        
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result= mysqli_stmt_get_result($stmt);
    
        if($row=mysqli_fetch_assoc($result)){
            return $row;
        }

        else{
            $result= false;
            return $result;
        }

        mysqli_stmt_close($stmt);
    }


    function create_admin($conn, $email, $password ){
    
  
        $insert= "INSERT INTO users ( email,  password, type) VALUES (?,?,?)";

        $stmt2=mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt2, $insert)){
            header("location: res_auth.php?error=stmtfailed");
            exit();
        }
        
        $type="admin";
        
        $hashed_pwd=password_hash($password, PASSWORD_DEFAULT);

        mysqli_stmt_bind_param($stmt2, 'sss',  $email,  $hashed_pwd, $type);
        mysqli_stmt_execute($stmt2);
        mysqli_stmt_close($stmt2);
        
        echo json_encode([
            "status"=>"success"
        ]);
        exit();
    }


    function empty_res_signup($email, $fname, $phone, $password, $confirm ){
        $result;
        if($email=="" or $fname=="" or  $phone=="" or $password=="" or $confirm=="" ){
            $result= true;
        }
        else {
            $result=false;
        } 

        return $result;
    }



    function empty_res_login($name, $password){
        $result;
        if($name=="" or $password==""){
            $result= true;
        }
        else {
            $result=false;
        } 

        return $result;
    }


    function admin_login($conn, $email, $password){
        $uidexist= admin_exists($conn, $email);

        if($uidexist===false){
            echo json_encode([
                "status"=>"invalid"
            ]);
            exit();
        }

        $pwdHashed=$uidexist["password"];
        $checkedpwd=password_verify($password, $pwdHashed);

        if($checkedpwd===false){
            echo json_encode([
                "status"=>"invalid"
            ]);
            exit();
        }

        else if($checkedpwd===true){

            session_start();

            $_SESSION["id"]=$uidexist["id"];
            $_SESSION["email"]=$uidexist["email"];
            $_SESSION["type"]=$uidexist["type"];
            
          
     
   
         

            echo json_encode([
                'status' => 'success',
                'redirect_url' => 'verify_user.html'
            ]);
            exit();
        }
    }



?>