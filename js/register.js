let fileInput=document.querySelector("#image")
let img_label=document.querySelector("#img_label")
let sale_submit=document.querySelector("#submit")
let data=document.querySelectorAll("#data");


data.forEach((datum, i)=> {

    datum.addEventListener("input", ()=>{
        let allFilled = Array.from(data).every((field) => field.value.trim() !== '');
    sale_submit.disabled = !allFilled;

    

    })
 
    
   
});


fileInput.addEventListener("change", ()=>{
    const file = fileInput.files[0]; // Get the first file

    img_label.textContent = `${file.name}`;
    document.querySelector(".img_input").value=`${file.name}`

    const event = new Event("input", { bubbles: true });
    document.querySelector(".img_input").dispatchEvent(event);
        // sale_submit.disabled=false;
 
})




let user_form=document.querySelector("#reg_form")

user_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const form_data= new FormData(user_form)


    fetch("backend/register.php", {
        method: "POST",
        body: form_data
    })

    .then(res=>res.json()).then(datas=>{
        if(datas.status==="success"){
            notify("account created")

            setTimeout(()=>{
                window.location.href="auth.html" 
            }, 500)
          
        }

        else if(datas.status==="pwd_match"){
            notify("passwords don't match")
            data[5].value=""
            data[6].value=""
            sale_submit.disabled=true
        }

        else if(datas.status==="email_exists"){
            notify("email already in use")
            data[4].value=""
            sale_submit.disabled=true
        }


        else if(datas.status==="matric_exists"){
            notify("matric no already exists")
            data[4].value=""
            sale_submit.disabled=true
        }


        else if(datas.status==="invalid_pass"){
            notify("invalid password")
            data[5].value=""
            data[6].value=""
            sale_submit.disabled=true
        }


        
    })

})