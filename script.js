// Maple Leaf Kitchen
// Menu page JavaScript
const menuItems = document.querySelectorAll(".food-info");

menuItems.forEach(function (item) {

    item.addEventListener("mouseenter", function () {
        item.style.transform = "scale(1.05)";
        item.style.transition = "transform 0.2s ease";
    });

    item.addEventListener("mouseleave", function () {
        item.style.transform = "scale(1)";
    });
});
// Interactive menu 
const menuForm = document.getElementById("menuForm");

menuForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const foodName = document.getElementById("foodName").value;
    const foodDescription = document.getElementById("foodDescription").value;
    const foodPrice = document.getElementById("foodPrice").value;

    // Create a new food item
    const newFood = document.createElement("div");

    newFood.classList.add("food-info");

    newFood.innerHTML = `
        <h3>${foodName}</h3>
        <p>${foodDescription}</p>
        <strong>KSh ${foodPrice}</strong>
    `;

    // Add it to the dinner section
    document.querySelector(".menu-section.dinner").appendChild(newFood);

    // Show success message
    const formMessage = document.getElementById("formMessage");

    formMessage.textContent = `${foodName} has been added to the menu!`;

});