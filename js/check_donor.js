fetch("backend/user_session.php", {
    method:"GET"
})

.then(res=>res.json()).then(session_data=>{
    if(session_data.isDonor!=="yes"){
  

        document.querySelector("#donate").style.display="none"
        
      

    }

  


})