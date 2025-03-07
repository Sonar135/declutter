
let options = document.querySelectorAll(".don-options");
let rows = document.querySelectorAll("#drow");

let reg_data=document.querySelectorAll("#reg-data");
let reg_btn=document.querySelector(".reg-btn")


let up_data=document.querySelectorAll("#up-data");
let up_btn=document.querySelector(".up-btn")

let don_data=document.querySelectorAll("#don-data");
let don_btn=document.querySelector(".don-btn")


const enable_button=(data, button)=>{
    data.forEach((datum, i)=> {

        datum.addEventListener("input", ()=>{
            let allFilled = Array.from(data).every((field) => field.value.trim() !== '');
        button.disabled = !allFilled;
    
        
    
        })
     
        
       
    });
}


enable_button(reg_data, reg_btn)
enable_button(up_data, up_btn)
enable_button(don_data, don_btn)


rows.forEach((row, i) => {
    row.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevents triggering document click

        let isActive = options[i].classList.contains("op_active");

        // Remove 'op_active' from all elements
        options.forEach(option => option.classList.remove("op_active"));

        rows.forEach(row=>{
            row.classList.remove("row-shadow");
        })
      

        // Toggle only if it wasn't active before
        if (!isActive) {
            options[i].classList.add("op_active");
            row.classList.add("row-shadow");

        }
    });
});

document.querySelectorAll(".reg-reject-id").forEach((manager,j) =>{
    manager.addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="block"
        document.querySelector(".reg-reject").style.display="block"

       
    })
})


document.querySelectorAll(".view-id").forEach((manager,j) =>{
    manager.addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="block"
        document.querySelector(".id-card").style.display="block"

       
    })
})


document.querySelectorAll(".up-reject-id").forEach((manager,j) =>{
    manager.addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="block"
        document.querySelector(".up-reject").style.display="block"

       
    })
})


document.querySelectorAll(".don-reject-id").forEach((manager,j) =>{
    manager.addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="block"
        document.querySelector(".don-reject").style.display="block"

       
    })
})


document.querySelectorAll(".close").forEach(close=>{
    close.addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="none"
        document.querySelector(".reg-reject").style.display="none"
        document.querySelector(".up-reject").style.display="none"
        document.querySelector(".don-reject").style.display="none"
        document.querySelector(".id-card").style.display="none"

    })
})


document.addEventListener("click", (event) => {
    if (![...rows, ...options].some(elem => elem.contains(event.target))) {
        options.forEach(option => option.classList.remove("op_active"));
        rows.forEach(row=>{
            row.classList.remove("row-shadow");
        })
    }
});




fetch("backend/get-pen-reg.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        data.forEach(datum=>{

          document.querySelector(".render-reg").innerHTML+=`
            <tr id="drow">
                                <td>${datum.name}</td>
                                <td>${datum.matric}

                                  <div class="don-options">
                                    <button class="flex-center reg-reject-id">Reject</button>
                                    <button class="flex-center view-id">view id</button>
                                  <form action="" id="accept-reg"> <input type="hidden" id="accept-reg-id" name="id" value='${datum.id}'> <button class="flex-center reg-approve-id">Approve</button></form> 
                                  </div>
                                </td>
                        
                                <td>${datum.matric}</td>
                                <td>${datum.email}</td>
                              </tr> `
        })
    }


    document.querySelectorAll(".reg-reject-id").forEach((manager,j) =>{
        manager.addEventListener("click", ()=>{
            document.querySelector(".screen_overlay").style.display="block"
            document.querySelector(".reg-reject").style.display="block"
            document.querySelector("#reg-name").textContent=`${data[j].name}`
            document.querySelector(".reg-id").value=`${data[j].id}`
    
           
        })
    })



    document.querySelectorAll(".view-id").forEach((manager,j) =>{
        manager.addEventListener("click", ()=>{
            document.querySelector(".screen_overlay").style.display="block"
            document.querySelector(".id-card").style.display="block"
            document.getElementById("id-image").src =`${data[j].photo}`;
           
        })
    })
    


})




let reject_reg_form= document.querySelector("#reject-reg-form");

don_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(reject_reg_form)


    fetch("backend/reject-reg.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("rejected. Sending email")

            setTimeout(()=>{
                location.reload()
            },500)
        }
    })
})


let accept_reg_form= document.querySelectorAll("#accept-reg");


accept_reg_form.forEach(form=>{
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
    
        let form_data= new FormData(form)
    
    
        fetch("backend/accept-reg.php", {
            method: "POST",
            body: form_data
        }).then(res=>res.json()).then(data=>{
            if(data.status==="success"){
                notify("accepted. Sending email")

                setTimeout(()=>{
                    location.reload()
                },500)
            }
        })
    })
})




fetch("backend/get-pen-up.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        data.forEach(datum=>{

          document.querySelector(".render-up").innerHTML+=`
            <tr id="drow">
                                <td>${datum.name}</td>
                                <td>${datum.matric}

                                  <div class="don-options">
                                    <button class="flex-center up-reject-id">Reject</button>
                                  <form action="" id="accept-up"> <input type="hidden" id="accept-up-id" name="id" value='${datum.id}'> <button class="flex-center reg-approve-id">Approve</button></form> 
                                  </div>
                                </td>
                                <td>${datum.phone}</td>
                                <td>${datum.email}</td>
                              </tr>  `
        })
    }


    document.querySelectorAll(".up-reject-id").forEach((manager,j) =>{
        manager.addEventListener("click", ()=>{
            document.querySelector(".screen_overlay").style.display="block"
            document.querySelector(".up-reject").style.display="block"
            document.querySelector("#up-name").textContent=`${data[j].name}`
            document.querySelector(".up-id").value=`${data[j].id}`
    
           
        })
    })


})




let reject_up_form= document.querySelector("#reject-up-form");

reject_up_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(reject_up_form)


    fetch("backend/reject-up.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("rejected. Sending email")

            setTimeout(()=>{
                location.reload()
            },500)
        }
    })
})


let accept_up_form= document.querySelectorAll("#accept-up");


accept_up_form.forEach(form=>{
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
    
        let form_data= new FormData(form)
    
    
        fetch("backend/accept-up.php", {
            method: "POST",
            body: form_data
        }).then(res=>res.json()).then(data=>{
            if(data.status==="success"){
                notify("accepted. Sending email")

                setTimeout(()=>{
                    location.reload()
                },500)
            }
        })
    })
})





fetch("backend/get-pen-don.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        data.forEach(datum=>{

          document.querySelector(".render-don").innerHTML+=`
           <tr id="drow">
                                <td><div class="exp_img"><img src="../pictures/${datum.photo}" alt=""></div></td>
                                 <td>${datum.name}

                                  <div class="don-options">
                                    <button class="flex-center don-reject-id">Reject</button>
                                  <form action="" id="accept-don"> <input type="hidden" id="accept-don-id" name="id" value='${datum.id}'> <button class="flex-center reg-approve-id">Approve</button></form> 
                                  </div>
                                 </td>
                                 <td>${datum.upload_date}</td>
                                 <td>${datum.quality}</td>
                                 <td>${datum.donor}</td>
                               </tr> 
  `
        })
    }


    document.querySelectorAll(".don-reject-id").forEach((manager,j) =>{
        manager.addEventListener("click", ()=>{
            document.querySelector(".screen_overlay").style.display="block"
            document.querySelector(".don-reject").style.display="block"
            document.querySelector("#don-name").textContent=`${data[j].donor}`
            document.querySelector(".don-id").value=`${data[j].id}`
    
           
        })
    })




    


})




let accept_don_form= document.querySelectorAll("#accept-don");


accept_don_form.forEach(form=>{
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
    
        let form_data= new FormData(form)
    
    
        fetch("backend/accept-don.php", {
            method: "POST",
            body: form_data
        }).then(res=>res.json()).then(data=>{
            if(data.status==="success"){
                notify("accepted. Sending email")

                setTimeout(()=>{
                    location.reload()
                },500)
            }
        })
    })
})


let reject_don_form= document.querySelector("#reject-don-form");

reject_don_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(reject_up_form)


    fetch("backend/reject-don.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("rejected. Sending email")

            setTimeout(()=>{
                location.reload()
            },500)
        }
    })
})