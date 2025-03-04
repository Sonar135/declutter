document.querySelectorAll(".claim_id").forEach((manager,j) =>{
    manager.addEventListener("click", ()=>{
    document.querySelector(".screen_overlay").style.display="block"
    document.querySelector(".action").style.display="block"
    document.querySelector("#name").innerHTML=`${data[j].name}`
    document.querySelector("#id").value=data[j].id
    
    
    
    
    
    
    })
    })


    document.querySelector("#no").addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="none"
        document.querySelector(".action").style.display="none"
        document.querySelector("#name").textContent=""
        document.querySelector("#id").value=""
    })


    document.querySelector("#search").addEventListener("click", ()=>{
        document.querySelector(".search").classList.toggle("search_active")
    })