


fetch("../backend/admin_session.php", {
    method:"GET"
})

.then(res=>res.json()).then(session_data=>{
    if(session_data.status=="logged in"){
  
        
        if(session_data.type=="admin"){

        }

        else{
              window.location.href="login.html"
        }

    }

  


    else{
        window.location.href="login.html"
    }
})


