let data=document.querySelectorAll("#data");

let don_data=document.querySelectorAll("#don-data")

let id_data=document.querySelectorAll("#id-data")


let fileInput=document.querySelector("#img")
let img_label=document.querySelector("#img_label")


let approve_file_input=document.querySelector("#id-img")
let approve_img_label=document.querySelector("#id-label")



data.forEach((datum, i)=> {

    datum.addEventListener("input", ()=>{
        let allFilled = Array.from(data).every((field) => field.value.trim() !== '');
    document.querySelector(".submit").disabled = !allFilled;

    

    })
 
    
   
});


don_data.forEach((datum, i)=> {

    datum.addEventListener("input", ()=>{
        let allFilled = Array.from(don_data).every((field) => field.value.trim() !== '');
    document.querySelector(".don-submit").disabled = !allFilled;

    

    })
 
    
   
});



id_data.forEach((datum, i)=> {

    datum.addEventListener("input", ()=>{
        let allFilled = Array.from(id_data).every((field) => field.value.trim() !== '');
    document.querySelector(".approve-submit").disabled = !allFilled;

    

    })
 
    
   
});





document.querySelectorAll(".edit_id").forEach((manager,j) =>{
    manager.addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="block"
        document.querySelector(".form_cont").style.display="block"
        document.querySelector(".name").value=`${data[j].name}`
        document.querySelector(".quantity").value=`${data[j].quantity}`
        document.querySelector(".price").value=`${data[j].price}`
        document.querySelector(".id").value=`${data[j].id}`
        document.querySelector(".name").dispatchEvent(action);
       
    })
})








document.querySelectorAll(".close").forEach(close=>{
    close.addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="none"
        document.querySelector(".form_cont").style.display="none"
        document.querySelector(".don-form").style.display="none"
        document.querySelector(".approve-form").style.display="none"
        document.querySelector("#name").textContent=""
        document.querySelector("#id").value=""
    })
})



  

        
document.querySelector("#no").addEventListener("click", ()=>{
    document.querySelector(".screen_overlay").style.display="none"
    document.querySelector(".action").style.display="none"
    document.querySelector("#name").textContent=""
    document.querySelector("#id").value=""
})



fileInput.addEventListener("change", ()=>{
    const file = fileInput.files[0]; // Get the first file

    img_label.textContent = `${file.name}`;
    document.querySelector(".img_input").value=`${file.name}`

    const event = new Event("input", { bubbles: true });
    document.querySelector(".img_input").dispatchEvent(event);
        // sale_submit.disabled=false
})


approve_file_input.addEventListener("change", ()=>{
    const file = approve_file_input.files[0]; // Get the first file

    approve_img_label.textContent = `${file.name}`;
    document.querySelector(".id_input").value=`${file.name}`

    const event = new Event("input", { bubbles: true });
    document.querySelector(".id_input").dispatchEvent(event);
        // sale_submit.disabled=false;
 
})





fetch("backend/claim-history.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        data.forEach(datum=>{

            let delivery_date= datum.delivery_date===""?"not delivered":datum.delivery_date
            document.querySelector("#claims").innerHTML+=`
               <tr>
                                <td><div class="exp_img"><img src="pictures/${datum.photo}" alt=""></div></td>
                                <td>${datum.name}</td>
                                <td>${datum.status}</td>
                                <td>${datum.claim_date}</td>
                                <td>${delivery_date}</td>
                              </tr> `

                             
        })
    }


})



fetch("backend/donate-history.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        let content=""
        data.forEach(datum=>{
            let delivery_date= datum.delivery_date===""?"not delivered":datum.delivery_date
       
           content+=`
                            <tr id= "drow">
                                <td><div class="exp_img"><img src="pictures/${datum.photo}" alt=""></div></td>
                                <td>${datum.name}</td>
                                <td>${datum.recipient}</td>
                                <td>${datum.claim_date}
                                <div class="don-options">
                                <button class="flex-center don-id">Edit</button>
                                    <button class="flex-center delete_id">Delete</button>
                                  </div>
                                </td>
                                <td>${datum.claim_status}</td>
                                <td>${delivery_date}</td>
                                <td>${datum.donation_status}</td>
                              </tr> `


                    document.querySelector("#total-don").textContent=`donated: ${datum.num}`


                    setTimeout(()=>{
                        document.querySelector("#donated").innerHTML=content


                        let options = document.querySelectorAll(".don-options");
                        let rows = document.querySelectorAll("#drow");
                        
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
                        
                        // Click outside event listener
                        document.addEventListener("click", (event) => {
                            if (![...rows, ...options].some(elem => elem.contains(event.target))) {
                                options.forEach(option => option.classList.remove("op_active"));
                                rows.forEach(row=>{
                                    row.classList.remove("row-shadow");
                                })
                            }
                        });
                        
                        
                        document.querySelectorAll(".delete_id").forEach((manager,j) =>{
                            manager.addEventListener("click", ()=>{
                            document.querySelector(".screen_overlay").style.display="block"
                            document.querySelector(".action").style.display="block"
                            document.querySelector("#name").innerHTML=`${data[j].name}`
                            document.querySelector("#id").value=data[j].id
                            
                            
                            
                            })
                            })


                            document.querySelectorAll(".don-id").forEach((manager,j) =>{
                                manager.addEventListener("click", ()=>{
                                    document.querySelector(".screen_overlay").style.display="block"
                                    document.querySelector(".don-form").style.display="block"
                                    document.querySelector(".don-name").value=`${data[j].name}`
                                    document.querySelector(".don_id").value=`${data[j].id}`
                                    document.querySelector(".name").dispatchEvent(action);
                                    document.querySelector("#don-name").textContent=`${data[j].name}`
                                    document.querySelector("#img_label").textContent=`${data[j].photo}`
                                    document.querySelector(".img_input").value=`${data[j].photo}`

                                   
                                })
                            })


                            let delete_form= document.querySelectorAll("#delete_form");





delete_form.forEach(form=>{
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
    
        let form_data= new FormData(form)
    
    
        fetch("backend/delete-item.php", {
            method: "POST",
            body: form_data
        }).then(res=>res.json()).then(data=>{
            if(data.status==="success"){
                notify("item deleted")


                setTimeout(()=>{
                    location.reload()
                },500)
            }
        })
    })
})










let don_form= document.querySelector("#edit-don-form");

don_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(don_form)


    fetch("backend/update-item.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("item updated")


            setTimeout(()=>{
                location.reload()
            },500)

          
        }
    })
})

                    
                    },199)
        })
    }







    


})




fetch("backend/profile.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        data.forEach(datum=>{

        document.querySelector(".box_1").innerHTML=` 
           <h4>Name:${datum.name}</h4>
                <h4>Matric no: ${datum.matric}</h4>
                <h4>Phone: ${datum.phone}</h4>
                <h4>Hall: ${datum.hall}</h4>
                <button class="edit_id"><i class="fa-solid fa-pen"></i></button>`


                    let tier= datum.tier==="yes"?"donor":"recipient"

                    document.querySelector("#up-id").value=`${datum.id}`

             

                    if(datum.tier==="pending"){
                        document.querySelector(".pending").style.display="block";
                    }

                    if(datum.approved==""){
                        document.querySelector("#request").style.display="block";
                    }

                    if(datum.approved=="pending"){
                        document.querySelector(".pending_approve").style.display="block";
                    }


                    if(datum.tier=="" && datum.approved=="approved"){
                        document.querySelector("#upgrade").style.display="block";
                    }

                   document.querySelector("#tier").textContent=`Tier: ${tier}`
        })

        

     
    }


    document.querySelectorAll(".edit_id").forEach((manager,j) =>{
        manager.addEventListener("click", ()=>{
            document.querySelector(".screen_overlay").style.display="block"
            document.querySelector(".form_cont").style.display="block"
            document.querySelector(".name").value=`${data[j].name}`
            document.querySelector(".phone").value=`${data[j].phone}`
            document.querySelector(".hall").value=`${data[j].hall}`
            document.querySelector(".name").dispatchEvent(action);
           
        })
    })



    
    document.querySelectorAll("#request").forEach((manager,j) =>{
        manager.addEventListener("click", ()=>{
            document.querySelector(".screen_overlay").style.display="block"
            document.querySelector(".approve-form").style.display="block"
        })
    })


})



fetch("backend/get-sec-claim.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        document.querySelector("#total-clmd").textContent=`successfully claimed: ${data.num}`
    }


})



let edit_form= document.querySelector("#edit_form");

edit_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(edit_form)


    fetch("backend/update-prof.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("profile updated")


            setTimeout(()=>{
                location.reload()
            },500)

          
        }
    })
})







let approve_form= document.querySelector("#approve-form");

approve_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(approve_form)


    fetch("backend/approve.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("approval request sent")


            setTimeout(()=>{
                location.reload()
            },500)

          
        }
    })
})








let upgrade= document.querySelector("#upgrade");

upgrade.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(upgrade)


    fetch("backend/request_up.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("upgrade request sent")


            setTimeout(()=>{
                location.reload()
            },500)

          
        }
    })
})







fetch("backend/user_session.php", {
    method:"GET"
})

.then(res=>res.json()).then(session_data=>{
    if(session_data.isDonor!=="yes"){
  

        document.querySelector(".sec3").style.display="none"
        document.querySelector(".donor").style.display="none"
        
      

    }

  


})


