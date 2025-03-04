const action = new Event("input", { bubbles: true });



const notify=(text)=>{
    let message=document.querySelector(".message")
    message.textContent=text;

    message.style.display="flex";


    setTimeout(() => {
        message.style.display="none";
        }, 7000);
}