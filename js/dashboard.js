let data=document.querySelectorAll("#data");

let don_data=document.querySelectorAll("#don-data")


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


document.querySelectorAll(".don-id").forEach((manager,j) =>{
    manager.addEventListener("click", ()=>{
        document.querySelector(".screen_overlay").style.display="block"
        document.querySelector(".don-form").style.display="block"
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
        document.querySelector("#name").textContent=""
        document.querySelector("#id").value=""
    })
})



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


        
document.querySelector("#no").addEventListener("click", ()=>{
    document.querySelector(".screen_overlay").style.display="none"
    document.querySelector(".action").style.display="none"
    document.querySelector("#name").textContent=""
    document.querySelector("#id").value=""
})