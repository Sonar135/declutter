const action = new Event("input", { bubbles: true });



let message_timer; 

const notify = (text) => {
    let message = document.querySelector(".message");

    clearTimeout(message_timer); 

    message.textContent = text;
    message.style.display = "flex";

    message_timer = setTimeout(() => {
        message.style.display = "none";
    }, 7000);
};