


fetch("backend/admin_session.php", {
    method:"GET"
})

.then(res=>res.json()).then(session_data=>{
    if(session_data.status=="logged in"){
  
        
        if(session_data.user_type=="admin"){

        }

        else{
              window.location.href="admin/login.html"
        }

    }

  


    else{
        window.location.href="login.html"
    }
})


