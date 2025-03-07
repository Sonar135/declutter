


fetch("backend/user_session.php", {
    method:"GET"
})

.then(res=>res.json()).then(session_data=>{
    if(session_data.status=="logged in"){
  
        
        document.querySelector(".menu ul").innerHTML+=`<li><a href="logout.php"><i class="fa-solid fa-lock"></i>Logout</a></li>`
        document.querySelector("#login").style.display="none";
    }

  



})


