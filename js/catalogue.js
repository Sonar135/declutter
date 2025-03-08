let cat= document.querySelector("#cat")
let category_li=document.querySelectorAll(".large_select ul li")
let delay
let cat_input=document.querySelector("#cat_input")


cat.addEventListener("mouseenter", ()=>{
    if(delay) clearTimeout(delay);
    document.querySelector(".large_select").style.display="block"
})

cat.addEventListener("mouseleave", ()=>{
    if(delay) clearTimeout(delay);
   delay= setTimeout(()=>{
        document.querySelector(".large_select").style.display="none"
    }, 500)
})


const get_input=(input_li, input)=>{
    input_li.forEach((li)=>{
        li.addEventListener("click", ()=>{
    
    
            if(li.classList.contains("selected")){
    
                input.value="";
                li.classList.remove("selected")
            }
    
            else{
                input.value=li.textContent;
                li.classList.add("selected")
    
                
        
                input_li.forEach((li_not)=>{
                    if(li_not!==li){
                        li_not.classList.remove("selected");
                    }
                })
            }
       
           
            const event = new Event("input", { bubbles: true });
            input.dispatchEvent(event);
    
        })
    })
    
    }


    get_input(category_li, cat_input)





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





    function fetchInventory(filters = {}) {

        document.querySelector(".render").innerHTML=""
        // item_cont.innerHTML = "";
    
        const queryParams = new URLSearchParams(filters).toString();
    
     
        
        fetch(`backend/get_items.php?${queryParams}`, {
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
                document.querySelector("#name").textContent=data[j].name
                
                
                })
                })
        })
   
    
    
    }
    
    
    



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

            setTimeout(()=>{
                location.reload()
            },500)
        }


        if(data.status==="not_approved"){
            notify("your account awaits approval")

        }

       
    })
})



let filter_form=document.querySelector("#filter_form")


filter_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(filter_form);
    const filters = Object.fromEntries(formData.entries());
     document.querySelector(".large_select").style.display="none"
    document.querySelector(".search").classList.remove("search_active")
    fetchInventory(filters);

    
});


    
fetchInventory()