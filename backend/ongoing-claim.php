



<?php
    include "connect.php";

    session_start();

 
    require_once __DIR__ . '/../phpmailer/src/Exception.php';
require_once __DIR__ . '/../phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/../phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


    $id= $_POST["id"];



   


    $query= mysqli_query($conn, "UPDATE items set claim_status='ongoing' where id='$id'");

    $get=mysqli_query($conn, "SELECT * from items where id='$id'");

    $row=mysqli_fetch_assoc($get);

    $email=$row["recipient_email"];
    $name=$row["name"];

    if($query){
        if(sendThankYouEmail($email, $name)){
            echo json_encode([
                "status" => "success"
            ]);
          }
    }
 



    function sendThankYouEmail($toEmail, $item) { // Add username parameter
        try {
            $mail = new PHPMailer(true);
            
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'vefidi135@gmail.com';
            $mail->Password = 'brwiwpxnmvgvelpt';
            $mail->Port = 465; // Use SSL
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    
            // Recipients
            $mail->setFrom('vefidi13@gmail.com', 'Declutter');
            $mail->addAddress($toEmail);
    
            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Claim Notification';
            
            // Email body content with personalized username
            $mail->Body = '
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
    
                            .container span{
                        font-weight:900;
                    }
    
    
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #555555;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Not Long Now...</h1>
                    <p>Your claimed item  <span> ' . htmlspecialchars($item) . '</span> has been dropped off with the middle man</p>
                    <p>please contact the middle man <span class="">Mr Felix (09049534857) to pick up your claimed item</span></p>
                </div>
                <div class="footer">
                    <p>This email was sent to ' . htmlspecialchars($toEmail) . '.</p>
                </div>
            </body>
            </html>';
    
            $mail->AltBody = 'Thank you';
    
            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
            return false;
        }
    }
    





 

   
?>