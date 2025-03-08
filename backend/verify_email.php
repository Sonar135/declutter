<?php

        include 'functions.php';
        include 'connect.php';

        $email=$_POST['email'];

        $code=mt_rand(100000, 999999);

        require_once __DIR__ . '/../phpmailer/src/Exception.php';
        require_once __DIR__ . '/../phpmailer/src/PHPMailer.php';
        require_once __DIR__ . '/../phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



    $query= mysqli_query($conn, "INSERT into verify (email, code) values ('$email', $code) ");



    $emailSent = sendThankYouEmail($email, $code); 

    if($query){
        echo json_encode([
            "status" => "success"
        ]);
    }








    function sendThankYouEmail($toEmail, $v_code) { // Add username parameter
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
            $mail->Subject = 'your verification code';
            
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
                    <h1>Your Code...</h1>
                    <p>Your code is ' . htmlspecialchars($v_code) . ',</p>
                    <p>Please do not share this code to anyone</p>
                </div>
                <div class="footer">
                    <p>This email was sent to ' . htmlspecialchars($toEmail) . '.</p>
                    <p>If you did not register, please ignore this email.</p>
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