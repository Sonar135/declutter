let user_form=document.querySelector("#form")

user_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const form_data= new FormData(user_form)


    fetch("../backend/admin_reg.php", {
        method: "POST",
        body: form_data
    })

    .then(res=>res.json()).then(datas=>{
        if(datas.status==="success"){
            notify("account created")

         
          
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