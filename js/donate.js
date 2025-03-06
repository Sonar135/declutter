let product_form=document.querySelector("#product_form");
let message=document.querySelector(".message");
let product_data=document.querySelectorAll("#data");
let data=document.querySelectorAll("#data");
let sale_submit=document.querySelector("#sale_submit")
let fileInput=document.querySelector("#img")
let img_label=document.querySelector("#img_label")
let cat_sel= document.querySelector(".cat_selector")
let cat_h4=document.querySelector(".cat_selector h4")
let categories=document.querySelectorAll(".categories ul li");
let fields=document.querySelectorAll(".field")
let cat_value=document.querySelector(".cat_value");


const notify=(text)=>{
    message.textContent=text;

    message.style.display="flex";


    setTimeout(() => {
        message.style.display="none";
        }, 7000);
}


fields.forEach((field, i) =>{
    setTimeout(() => {
        field.style.display = 'flex'; 
      }, i * 100); 
})


categories.forEach((category, i) => {
    category.addEventListener("click", ()=>{
        let item_data=category.textContent;
        // item_h4.classList.add("animate-text");
        cat_value.value=item_data;
        const event = new Event("input", { bubbles: true });

        cat_value.dispatchEvent(event);
        cat_h4.textContent=item_data;

        cat_h4.classList.remove("animate-text");

        void cat_h4.offsetWidth;
        cat_h4.classList.add("animate-text");

        document.querySelector(".categories").style.display="none";
    })


   
});



data.forEach((datum, i)=> {

    datum.addEventListener("input", ()=>{
        let allFilled = Array.from(data).every((field) => field.value.trim() !== '');
    sale_submit.disabled = !allFilled;

    

    })
 
    
   
});


categories.forEach((category, i)=>{
    cat_sel.addEventListener("mouseenter", ()=>{
        document.querySelector(".categories").style.display="block";
    
        
    
        setTimeout(() => {
            category.style.display="block";
        }, i*100);
    
    })
})



categories.forEach((category, i)=>{
    cat_sel.addEventListener("mouseleave", ()=>{
        document.querySelector(".categories").style.display="none";
    
        
    
      
            category.style.display="none";
        
    
    })
})



product_form.addEventListener("submit", (e)=>{
    e.preventDefault();

   const form_data=new FormData(product_form);


   fetch("../backend/new_product.php", {
    method: 'POST',
    body: form_data
})

.then(response=>response.json())
.then(data=>{
    if(data.status==="success"){
      notify("product added")

       cat_h4.textContent="category";
       img_label.textContent="product image"

       setTimeout(() => {
        message.style.display='none';
        }, 7000);
        
        sale_submit.disabled = true;

        product_data.forEach((datum, i)=> {

            datum.value="";        
           
        });
    }

   





    else if(data.status==="quantity_invalid"){
        message.style.display="flex";
        message.textContent="invalid quantity"
        setTimeout(()=>{
            message.style.disabled="none";
        }, 7000);

        product_data[2].value="";
    }
})
})





fileInput.addEventListener("change", ()=>{
    const file = fileInput.files[0]; // Get the first file

    img_label.textContent = `${file.name}`;
    document.querySelector(".img_input").value=`${file.name}`

    const event = new Event("input", { bubbles: true });
    document.querySelector(".img_input").dispatchEvent(event);
        // sale_submit.disabled=false;
 
})



let don_form= document.querySelector("#don_form");

don_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    let form_data= new FormData(don_form)


    fetch("backend/donate.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){
            notify("Donated. Awaiting Approval")
        }
    })
})