<?php

        include 'functions.php';
        include 'connect.php';

        $email=$_POST['email'];
        $password=$_POST['password'];



        



    login($conn, $email, $password);
    


  

  
    
?>