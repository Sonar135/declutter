


fetch("backend/user_session.php", {
    method:"GET"
})

.then(res=>res.json()).then(session_data=>{
    if(session_data.status=="logged in"){
  
        
        if(session_data.user_type=="user"){

        }

        else{
              window.location.href="auth.html"
        }

    }

  


    else{
        window.location.href="auth.html"
    }
})


