<?php

        include 'functions.php';
        include 'connect.php';

        $email=$_POST['email'];
        $password=$_POST['password'];



        



    admin_login($conn, $email, $password);
    


  

  
    
?>