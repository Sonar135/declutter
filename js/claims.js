
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