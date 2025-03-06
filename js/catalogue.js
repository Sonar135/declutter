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


    fetch("backend/get_items.php", {
        method:"GET",
    }).then(res=>res.json()).then(data=>{
        if(data.status==="empty"){

        }

        else{
            data.forEach(datum=>{

                let condition

                if(datum.state==="new"){
                    condition= "N"
                }

                if(datum.state==="fairly used"){
                    condition= "S"
                }

                if(datum.state==="used"){
                    condition= "F"
                }
                
                document.querySelector(".render").innerHTML+=`
                   <div class="card">
                <div class="top">
                    <h4>${datum.name}</h4>

                    <div class="rating">
                        ${condition}
                    </div>
                </div>

                <div class="bottom">
                    <button class="claim_id">Claim</button>

                    <div class="img"><img src="pictures/${datum.photo}" alt=""></div>
                </div>
            </div>`
            })
        }


        document.querySelectorAll(".claim_id").forEach((manager,j) =>{
            manager.addEventListener("click", ()=>{
            document.querySelector(".screen_overlay").style.display="block"
            document.querySelector(".action").style.display="block"
            document.querySelector("#id").value=data[j].id
            
            
            
            
            
            
            })
            })
    })



let claim_form= document.querySelector("#claim-form");

claim_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(claim_form)


    fetch("backend/claim.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("Claimed. Awaiting drop off")
        }
    })
})