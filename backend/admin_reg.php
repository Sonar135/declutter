
<?php
 
    include 'functions.php';
    include 'connect.php';




        $email=$_POST['email'];
        $password=$_POST['password'];




     
        

    

  




     

        create_admin($conn, $email, $password);
    
        

?>


