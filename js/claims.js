







fetch("../backend/get-pen-claims.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{

        let content=""
        data.forEach(datum=>{

         content+=`
            
                            <tr id="drow">
                            <td><div class="exp_img"><img src="../pictures/${datum.photo}" alt=""></div></td>
                            <td>${datum.name}</td>
                                <td>${datum.recipient}
                                  <div class="don-options">
                                  <form action="" id="ong"> <input type="hidden" id="ong-claim-id" name="id" value='${datum.id}'> <button class="flex-center">Ongoing</button></form> 
                                  <form action="" id="comp"> <input type="hidden" id="comp-claim-id" name="id" value='${datum.id}'> <button class="flex-center">Complete</button></form> 
                                  <form action="" id="disp"> <input type="hidden" id="disp-claim-id" name="id" value='${datum.id}'> <button class="flex-center">Disputed</button></form> 
                                  </div>
                                </td>
                                <td>${datum.recipient_no}</td>

                              
                             
                             
                                <td>${datum.donor}   </td>
                                
                             

                                <td>${datum.donor_no}</td>
                                <td>${datum.claim_date}</td>
                                <td>${datum.claim_status}</td>
                              </tr> 
 `


                setTimeout(()=>{
                    document.querySelector("#render-pen").innerHTML=content

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


document.addEventListener("click", (event) => {
    if (![...rows, ...options].some(elem => elem.contains(event.target))) {
        options.forEach(option => option.classList.remove("op_active"));
        rows.forEach(row=>{
            row.classList.remove("row-shadow");
        })
    }
});


let ong= document.querySelectorAll("#ong")

ong.forEach(form=>{
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
    
        let form_data= new FormData(form)
    
    
        fetch("../backend/ongoing-claim.php", {
            method: "POST",
            body: form_data
        }).then(res=>res.json()).then(data=>{
            if(data.status==="success"){
                notify("status set to ongoing")

                setTimeout(()=>{
                    location.reload()
                },500)
            }
        })
    })
})


let comp= document.querySelectorAll("#comp")

comp.forEach(form=>{
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
    
        let form_data= new FormData(form)
    
    
        fetch("../backend/comp-claim.php", {
            method: "POST",
            body: form_data
        }).then(res=>res.json()).then(data=>{
            if(data.status==="success"){
                notify("status set to completed")

                setTimeout(()=>{
                    location.reload()
                },500)
            }
        })
    })
})


let disp= document.querySelectorAll("#disp")

disp.forEach(form=>{
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
    
        let form_data= new FormData(form)
    
    
        fetch("../backend/disp-claim.php", {
            method: "POST",
            body: form_data
        }).then(res=>res.json()).then(data=>{
            if(data.status==="success"){
                notify("Item Claim has been disputed")

                setTimeout(()=>{
                    location.reload()
                },500)
            }
        })
    })
})



                },100)


              
        })
    }

})





fetch("../backend/get-succ-claims.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        data.forEach(datum=>{

          document.querySelector("#render-succ").innerHTML+=`
            
                           <tr>
                                <td><div class="exp_img"><img src="../pictures/${datum.photo}" alt=""></div></td>
                                 <td>${datum.name}</td>
                                 <td>${datum.recipient}</td>
                                 <td>${datum.donor}</td>
                                 <td>${datum.delivery_date}</td>
                               </tr> 
 `
        })
    }

})