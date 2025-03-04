
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
