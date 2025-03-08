




fetch("../backend/all-users.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        data.forEach(datum=>{

          document.querySelector(".render").innerHTML+=`
            
                        <div href="user.html?v=${datum.id}" class="patient_card">
                <div class="ico_cont">
                    <i class="fa-regular fa-circle-user"></i>
                </div>

                <h4>${datum.name}</h4>
                <h4>${datum.matric}</h4>
            </div>
 `
        })
    }

})



fetch("../backend/all-donors.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{
    if(data.status==="empty"){

    }

    else{
        data.forEach(datum=>{

          document.querySelector(".render-don").innerHTML+=`
            
                        <div href="user.html?v=${datum.id}" class="patient_card">
                <div class="ico_cont">
                    <i class="fa-regular fa-circle-user"></i>
                </div>

                <h4>${datum.name}</h4>
                <h4>${datum.matric}</h4>
            </div>
 `
        })
    }

})