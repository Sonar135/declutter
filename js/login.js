let login=document.querySelector("#login-form")
let data=document.querySelectorAll("#data")
let sale_submit= document.querySelector("#submit")


data.forEach((datum, i)=> {

    datum.addEventListener("input", ()=>{
        let allFilled = Array.from(data).every((field) => field.value.trim() !== '');
    sale_submit.disabled = !allFilled;

    

    })
 
    
   
});





login.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data=new FormData(login);


    



    
    fetch("backend/login.php", {
        method: "POST",
        body:form_data
    })

    .then(res=>res.json()).then(data=>{
        if(data.status=="success"){
         window.location.href=data.redirect_url
        }


        else  if(data.status=="unapproved"){
            notify("User not approved yet");
           }

        else{
            notify("user does not exist");
        }
    })
})